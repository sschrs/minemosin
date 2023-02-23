import React from "react";
import useEventListener from "@use-it/event-listener";

import { ImCross, ImCheckmark } from 'react-icons/im'
import { useTranslation } from "react-i18next";

const ShowCorrect = (props) => {
    const { t } = useTranslation();
    const { showCorrectData, closePanel } = props;
    const { word, wrongAnswer, correctAnswer } = showCorrectData;

    useEventListener('keydown', event => {
        if (event.key === 'Enter') closePanel();
    });

    return (
        <div className="pt-2">
            <div className="bg-secondary p-4 rounded" style={{border: '1px solid #df4759'}}>
                <div className="text-muted">{t('shared.word')}:</div>
                <h3> {word} </h3>
                <div className="row">
                    <div className="col-6">
                        <span className="text-muted">{t('learn.showCorrect.yourAnswer')}:</span>
                        <h3 className="text-danger"><ImCross/> {wrongAnswer}</h3>
                    </div>
                    <div className="col-6">
                        <span className="text-muted">{t('learn.showCorrect.correct')}</span>
                        <h3 className="text-success"><ImCheckmark/> {correctAnswer}</h3>
                    </div>
                </div>
                <button className="btn btn-outline-warning mt-2 w-100" onClick={closePanel} >{t('shared.okey')}</button>
            </div>
        </div>
    )
}

export default ShowCorrect;