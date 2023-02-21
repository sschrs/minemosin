import React from "react";

const MultipleChoice = (props) => {
    return (
        <div className="pt-2">
            <div className="bg-secondary p-4 rounded">
                <div className="text-muted">Word:</div>
                <h3>der Computer</h3>
                <div className="text-muted mt-3">Answer:</div>
                <div className="row">
                    <div className="col-3">
                        <small>1.</small>
                        <button className="btn btn-outline-success w-100">bilgisayar</button>
                    </div>
                    <div className="col-3">
                        <small>2.</small>
                        <button className="btn btn-outline-warning w-100">klavye</button>
                    </div>
                    <div className="col-3">
                        <small>3.</small>
                        <button className="btn btn-outline-danger w-100">monitör</button>
                    </div>
                    <div className="col-3">
                        <small>4.</small>
                        <button className="btn btn-outline-info w-100">yazıcı</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultipleChoice;