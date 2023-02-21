import React from "react";
import { Link } from "react-router-dom";

// show list title and link
const ListCard = (props) => {
    const { title, link } = props;
    return (
        <div className="col-3 d-flex p-1">
            <Link to={link} style={{ 'textDecoration': 'none', width: '100%'}}  >
                <div className="list-box bg-secondary p-3 rounded" style={{height:'100%'}}>
                    <div className="title text-light">{title}</div>
                </div>
            </Link>
        </div>

    )
}

export default ListCard;