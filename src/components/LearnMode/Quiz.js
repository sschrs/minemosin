/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */
import React, { useRef, useState, useEffect } from "react";
import useEventListener from "@use-it/event-listener";
import { useTranslation } from "react-i18next";

/**
 * Quiz as typing the answer
 * @param {object} props 
 */
const Quiz = (props) => {
    const { t } = useTranslation(); // i18n
    const [answer, setAnswer] = useState("");
    const { word, answerQuiz, isCorrect } = props
    const inputRef = useRef(); // answer input reference

    useEffect(()=>{
        inputRef.current.focus(); // focus input every turn
    })

    /**
     * handle keydowns
     * if key is enter or tab answer the question by input value
     */
    useEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === 'Tab'){
            if (inputRef.current.value === "") setAnswer("");
            answerQuiz(answer);
            inputRef.current.value = "";
        } 
    })

    return (
        <div className="pt-2">
            <div className="bg-secondary p-4 rounded" style={isCorrect ? {border: '1px solid #88DD83'} : {}}>
                <div className="text-muted">{t('shared.word')}</div>
                <h3>{word}</h3>
                <div className="text-muted mt-3">{t('shared.answer')}:</div>
                <div className="row">
                    <div className="col-10">
                        <input type="text" className="form-control" placeholder="Your answer:" onChange={e => setAnswer(e.target.value)} ref={inputRef} />
                    </div>
                    <div className="col-2">
                        <button onClick={e => answerQuiz(answer)} className="btn btn-outline-success w-100">{t('shared.answer')}</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Quiz;