import React from "react";
import MultipleChoice from "../components/LearnMode/MultipleChoice";
import ProgressBar from "../components/LearnMode/ProgressBar";
const LearnPage = () => {
    return (
        <div className="row justify-content-center ">
            <div className="col-10">
                <h1>Learn  <small className="text-muted" style={{fontSize : '15px'}}>Most Common Words in English</small></h1>
                <MultipleChoice />
                <ProgressBar />
            </div>
        </div>
    )
}

export default LearnPage;