import React, { useRef, useState, useEffect } from "react";
import useEventListener from "@use-it/event-listener";

const Quiz = (props) => {
    const [answer, setAnswer] = useState();
    const { word, answerQuiz, isCorrect } = props
    const inputRef = useRef();

    useEffect(()=>{
        inputRef.current.focus();
    })

    useEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === 'Tab'){
            answerQuiz(answer);
            inputRef.current.value = "";
        } 
    })

    return (
        <div>
            <div className="bg-secondary p-4 rounded" style={isCorrect ? {border: '1px solid #88DD83'} : {}}>
                <div className="text-muted">Word:</div>
                <h3>{word}</h3>
                <div className="text-muted mt-3">Answer:</div>
                <div className="row">
                    <div className="col-10">
                        <input type="text" className="form-control" placeholder="Your answer:" onChange={e => setAnswer(e.target.value)} ref={inputRef} />
                    </div>
                    <div className="col-2">
                        <button onClick={e => answerQuiz(answer)} className="btn btn-outline-success w-100">Answer</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Quiz;