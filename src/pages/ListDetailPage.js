import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { GiTeacher, GiFiles } from 'react-icons/gi'
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'

import ListRow from "../components/WordList/ListRow";

const ListDetailPage = () => {
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

    return (
        <div className="container mt-2">

            <h1>{wordList.title} <small className="text-muted" style={{ fontSize: '15px' }}>{keyWordMatchs.length} words</small></h1>
            <div className="row">
                <div className="col-3">
                    <button className="btn btn-outline-success btn-lg w-100"><GiTeacher /> Learn</button>
                </div>
                <div className="col-3">
                    <button className="btn btn-outline-warning btn-lg w-100"><GiFiles /> Cards</button>
                </div>
                <div className="col-3">
                    <Link to={`/edit-list/${listId}`} className="btn btn-outline-info btn-lg w-100"><BsFillPencilFill /> Edit</Link>
                </div>
                <div className="col-3">
                    <button className="btn btn-outline-danger btn-lg w-100"><BsFillTrashFill /> Delete</button>
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