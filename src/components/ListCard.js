import React from "react";
import { Link } from "react-router-dom";

const ListCard = (props) => {
    const { title, wordCount, link } = props;
    return (
        <div className="col-4 p-1">
            <Link to={link} style={{'textDecoration' : 'none'}}>
                <div className="list-box bg-secondary p-3 rounded">
                    <div className="title text-light">{title}</div>
                    <small className="text-muted">{wordCount} Words</small>
                </div>
            </Link>
        </div>

    )
}

export default ListCard;