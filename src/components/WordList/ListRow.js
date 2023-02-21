import React from "react";

import { RiDeleteBin2Fill } from 'react-icons/ri';
import { BsFillPencilFill } from 'react-icons/bs';


const ListRow = (props) => {
    const { isEditable, keyword, value, onDelete, onUpdate } = props

    return (
        <div className="row">
            <div className={isEditable ? 'col-5 mt-2' : 'col-6 mt-2'}>
                <div className="card border-secondary">
                    <div className="bg-secondary card-body">
                        <b>{keyword}</b>
                    </div>
                </div>
            </div>


            <div className={isEditable ? 'col-5 mt-2' : 'col-6 mt-2'}>
                <div className="card border-secondary">
                    <div className="bg-secondary card-body">
                        <b>{value}</b>
                    </div>
                </div>
            </div>

            {isEditable &&
                <div className="col-2 mt-2">
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-outline-warning p-3 w-100" onClick={onUpdate}><BsFillPencilFill /></button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-outline-danger p-3 w-100" onClick={onDelete} ><RiDeleteBin2Fill /></button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ListRow;