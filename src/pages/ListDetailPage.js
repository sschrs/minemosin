import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { GiTeacher, GiFiles } from 'react-icons/gi'
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'

import ListRow from "../components/WordList/ListRow";
import { useTranslation } from "react-i18next";

const ListDetailPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { listId } = useParams();
    const [wordList, setWordList] = useState({});
    const [keyWordMatchs, setKeyWordMatchs] = useState([]);

    useEffect(() => {
        getWordList();
        getWords();
    });

    const getWordList = async () => {
        const wordListDB = await window.electron.getWordListById(listId);
        setWordList(wordListDB);
    }

    const getWords = async () => {
        const words = await window.electron.getAllKeyWordMatchs(`wordListId = ${listId}`);
        setKeyWordMatchs(words);
    }

    const startLearnMode = ()=>{
        keyWordMatchs.length < 10 ? alert(t('listDetail.wordCountAlert')) : navigate(`/learn/${listId}`);
    }

    const deleteWordList = async ()=>{
        let response = window.confirm(t('listDetail.confirmDelete'))
        if (response) {
            await window.electron.deleteKeyWordMatchByWordListId(listId);
            await window.electron.deleteWordListById(listId);
            navigate('/');
        }
    }

    return (
        <div className="container mt-2">
            <h1>{wordList.title} <small className="text-muted" style={{ fontSize: '15px' }}>{keyWordMatchs.length} {t('shared.words')}</small></h1>
            <div className="row">
                <div className="col-3">
                    <button className="btn btn-outline-success btn-lg w-100" onClick={startLearnMode}  ><GiTeacher /> {t('listDetail.learn')}</button>
                </div>
                <div className="col-3">
                    <button className="btn btn-outline-warning btn-lg w-100"><GiFiles /> {t('listDetail.cards')}</button>
                </div>
                <div className="col-3">
                    <Link to={`/edit-list/${listId}`} className="btn btn-outline-info btn-lg w-100"><BsFillPencilFill /> {t('listDetail.edit')}</Link>
                </div>
                <div className="col-3">
                    <button className="btn btn-outline-danger btn-lg w-100" onClick={deleteWordList} ><BsFillTrashFill /> {t('listDetail.delete')}</button>
                </div>
            </div>
            <hr />
            <div className="list-row-container">
                {keyWordMatchs.map((word, index) => {
                    return (
                        <ListRow keyword={word.key} value={word.value} key={word.id} />
                    )
                })
                }
            </div>
        </div>
    )
}

export default ListDetailPage;