/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// show learn progress in learn-mode
const ProgressBar = (props) => {
    const { t } = useTranslation(); // i18n
    const { listId } = props; // wordList id
    const [percent, setPercent] = useState(0);
    const [completedWords, setCompletedWords] = useState(0);
    const [totalWords, setTotalWords] = useState(0);

    useEffect(() => {
        getProgress();
    })

    // getProgress from db
    const getProgress = async () => {
        const total = await window.electron.getCount(`wordListId = ${listId}`) // get total row count for the word list
        const completed = await window.electron.getCount(`wordListId = ${listId} AND priority = 0`) // get completed row count for the word list
        setTotalWords(total);
        setCompletedWords(completed);
        setPercent(Math.floor(completed * 100 / total));
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