import React from "react";

import { RiDeleteBin2Fill } from 'react-icons/ri';
import { BsFillPencilFill } from 'react-icons/bs';


const ListRow = (props)=>{
    const { id, keyword, value } = props
    return (
        <div className="row">
                <div className="col-5 mt-2">
                    <div className="card border-secondary">
                        <div className="bg-secondary card-body">
                            <b>{keyword}</b>
                        </div>
                    </div>
                </div>


                <div className="col-5 mt-2">
                    <div className="card border-secondary">
                        <div className="bg-secondary card-body">
                            <b>{value}</b>
                        </div>
                    </div>
                </div>

                <div className="col-2 mt-2">
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-outline-warning p-3 w-100"><BsFillPencilFill/></button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-outline-danger p-3 w-100"><RiDeleteBin2Fill /></button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ListRow;