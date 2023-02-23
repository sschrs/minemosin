import React from "react";
import medal from '../../assets/medal.png';
import { Link, useNavigate } from "react-router-dom";
import { resetWordList } from "../../helpers/learnMode";
const Complated = (props)=>{
    const { listId } = props;
    const navigate = useNavigate();
    const resetList = async ()=>{
        await resetWordList(listId);
        navigate(`/list-detail/${listId}`);
    }
    return (
        <div className="text-center">
            <img src={medal} alt="medal picture" width='40%' />
            <h1>Congratulations!</h1>
            <h3 className="text-muted">You Learned Everything!</h3>
            <Link className="btn btn-outline-success mx-1" to='/' >Go Home</Link>
            <button className="btn btn-outline-warning mx-1" onClick={resetList} >Restart List</button>
        </div>
    )
}

export default Complated;