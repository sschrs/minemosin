import React from "react";

import { RiFileExcel2Fill } from 'react-icons/ri';
import { AiFillFileText } from 'react-icons/ai'

const ImportPage = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-3">
                    <button className="btn btn-secondary w-100  p-5 text-center rounded">
                        <RiFileExcel2Fill style={{fontSize : "50px"}} />
                        <h3>Import From Excel</h3>
                    </button>
                </div>
                <div className="col-3">
                    <button className="btn btn-secondary w-100  p-5 text-center rounded">
                        <AiFillFileText style={{fontSize : "50px"}} />
                        <h3>Import From CSV,TXT...</h3>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImportPage;