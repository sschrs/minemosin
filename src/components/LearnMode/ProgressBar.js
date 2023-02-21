import React from "react";

const ProgressBar = () => {
    return (
        <div>
            <div className="progress mt-3" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar progress-bar-striped bg-secondary" style={{ width: '25%' }}></div>
            </div>
            <small className="text-muted">25% - 120/480</small>
        </div>

    )
}

export default ProgressBar;