/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */
import React, { useEffect, useState } from "react";
import ListCard from "../components/HomePage/ListCard";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

import { MdDoNotDisturb } from 'react-icons/md'

/**
 * lists all word lists
 */
const HomePage = () => {
    const [lists, setLists] = useState([]);
    const { t } = useTranslation(); // i18n

    useEffect(() => {
        getLists();
    })

    // get word lists from db and update state
    const getLists = async () => {
        const lists = await window.electron.getAllWordLists();
        setLists(lists);
    }

    return (
        <div className="container">
            <div className="row equal">
                {(lists.length > 0) && <h1>{t('homepage.title')}</h1>}
                {lists.map((wordList, index) => {
                    return (
                        <ListCard
                            key={wordList.id}
                            title={wordList.title}
                            wordCount=""
                            link={`/list-detail/${wordList.id}`}
                        />
                    )
                })
                }
            </div>
            {/* if there isn't any list */}
            {(lists.length <= 0) && 
                <div className="text-center mt-4"> 
                    <h1 className="text-secondary" style={{fontSize: '170px'}}><MdDoNotDisturb/></h1>
                    <h2 className="text-secondary mt-3">{t('homepage.noList')}</h2>
                    <Link className="btn btn-outline-secondary btn-lg mx-1" to='/new-list'>{t('homepage.createNew')}</Link>
                    <Link className="btn btn-outline-secondary btn-lg mx-1" to='/import'>{t('homepage.import')}</Link>
                </div>
            }
        </div>
    )
}
export default HomePage;