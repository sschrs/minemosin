import React from "react";
import useEventListener from "@use-it/event-listener";

import { ImCross, ImCheckmark } from 'react-icons/im'

const ShowCorrect = (props) => {
    const { showCorrectData, closePanel } = props;
    const { word, wrongAnswer, correctAnswer } = showCorrectData;

    useEventListener('keydown', event => {
        if (event.key === 'Enter') closePanel();
    });

    return (
        <div className="pt-2">
            <div className="bg-secondary p-4 rounded" style={{border: '1px solid #df4759'}}>
                <div className="text-muted">Word:</div>
                <h3> {word} </h3>
                <div className="row">
                    <div className="col-6">
                        <span className="text-muted">Your Answer:</span>
                        <h3 className="text-danger"><ImCross/> {wrongAnswer}</h3>
                    </div>
                    <div className="col-6">
                        <span className="text-muted">Correct:</span>
                        <h3 className="text-success"><ImCheckmark/> {correctAnswer}</h3>
                    </div>
                </div>
                <button className="btn btn-outline-warning mt-2 w-100" onClick={closePanel} >Okey</button>
            </div>
        </div>
    )
}

export default ShowCorrect;