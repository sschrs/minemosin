import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ProgressBar = (props) => {
    const { t } = useTranslation();
    const { listId } = props;
    const [percent, setPercent] = useState(0);
    const [completedWords, setCompletedWords] = useState(0);
    const [totalWords, setTotalWords] = useState(0);

    useEffect(()=>{
        getProgress();
    })

    const getProgress = async () => {
        const total = await window.electron.getCount(`wordListId = ${listId}`)
        const completed = await window.electron.getCount(`wordListId = ${listId} AND priority = 0`)
        setTotalWords(total);
        setCompletedWords(completed);
        setPercent(Math.floor(completed*100/total));
    }

    return (
        <div>
            <div className="progress mt-3">
                <div className="progress-bar progress-bar-striped bg-secondary" style={{ width: `${percent}%` }}></div>
            </div>
            <small className="text-muted">{t('learn.progressBar.youLearned')}: {percent}% - {completedWords}/{totalWords}</small>
        </div>

    )
}

export default ProgressBar;