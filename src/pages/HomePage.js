/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */
import React, { useEffect, useState } from "react";
import ListCard from "../components/HomePage/ListCard";
import { useTranslation } from "react-i18next";

/**
 * lists all word lists
 */
const HomePage = () => {
    const [lists, setLists] = useState([]);
    const { t } = useTranslation();

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
                <h1>{t('homepage.title')}</h1>
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
        </div>
    )
}
export default HomePage;