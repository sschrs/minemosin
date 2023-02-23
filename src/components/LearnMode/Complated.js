import React from "react";
import medal from '../../assets/medal.png';
import { Link, useNavigate } from "react-router-dom";
import { resetWordList } from "../../helpers/learnMode";
import { useTranslation } from "react-i18next";
const Complated = (props)=>{
    const { t } = useTranslation();
    const { listId } = props;
    const navigate = useNavigate();
    const resetList = async ()=>{
        await resetWordList(listId);
        navigate(`/list-detail/${listId}`);
    }
    return (
        <div className="text-center">
            <img src={medal} alt="medal picture" width='40%' />
            <h1>{t('learn.complated.congrats')}</h1>
            <h3 className="text-muted">{t('learn.complated.message')}</h3>
            <Link className="btn btn-outline-success mx-1" to='/' >{t('shared.goHome')}</Link>
            <button className="btn btn-outline-warning mx-1" onClick={resetList} >{t('learn.complated.restart')}</button>
        </div>
    )
}

export default Complated;