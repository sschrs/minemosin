import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetWordList } from "../../helpers/learnMode";
import { useTranslation } from "react-i18next";
import { RiMedalFill } from 'react-icons/ri';

const Completed = (props)=>{
    const { t } = useTranslation();
    const { listId } = props;
    const navigate = useNavigate();
    const resetList = async ()=>{
        await resetWordList(listId);
        navigate(`/list-detail/${listId}`);
    }
    return (
        <div className="text-center">
            <h1 className="text-success" style={{fontSize: '200px'}}><RiMedalFill/></h1>
            <h1>{t('learn.completed.congrats')}</h1>
            <h3 className="text-muted">{t('learn.completed.message')}</h3>
            <Link className="btn btn-outline-success mx-1" to='/' >{t('shared.goHome')}</Link>
            <button className="btn btn-outline-warning mx-1" onClick={resetList} >{t('learn.completed.restart')}</button>
        </div>
    )
}

export default Completed;