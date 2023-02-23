import React from "react";
import useEventListener from "@use-it/event-listener";

import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useTranslation } from "react-i18next";

const MultipleChoice = (props) => {
    const { t } = useTranslation();
    const { word, choices, correctAnswer, answerMultiple, isCorrect } = props;
    useEventListener('keydown', (event) => {
        if (event.key == 1) answerMultiple(choices[0])
        else if (event.key == 2) answerMultiple(choices[1])
        else if (event.key == 3) answerMultiple(choices[2])
        else if (event.key == 4) answerMultiple(choices[3])
    });
    return (
        <div className="pt-2">
            <div className="bg-secondary p-4 rounded" style={isCorrect ? {border: '1px solid #88DD83'} : {}}>
                <div className="text-muted">{t('shared.word')}:</div>
                <h3> {word} </h3>
                <div className="text-muted mt-3">{t('shared.answer')}:</div>

                <div className="row">
                    <div className="col-3">
                        <small>1.</small>
                        <button className="btn btn-outline-success w-100" onClick={e => answerMultiple(choices[0])} >{choices[0]}</button>
                    </div>
                    <div className="col-3">
                        <small>2.</small>
                        <button className="btn btn-outline-warning w-100" onClick={e => answerMultiple(choices[1])} >{choices[1]}</button>
                    </div>
                    <div className="col-3">
                        <small>3.</small>
                        <button className="btn btn-outline-danger w-100" onClick={e => answerMultiple(choices[2])} >{choices[2]}</button>
                    </div>
                    <div className="col-3">
                        <small>4.</small>
                        <button className="btn btn-outline-info w-100" onClick={e => answerMultiple(choices[3])} >{choices[3]}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultipleChoice;