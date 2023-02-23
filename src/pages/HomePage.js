/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */
import React, { useEffect, useState } from "react";
import ListCard from "../components/HomePage/ListCard";

/**
 * lists all word lists
 */
const HomePage = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        getLists();
    })

    // get word lists from db and update state
    const getLists = async () => {
        const lists = await window.electron.getAllWordLists();
        setLists(lists);
    }

    return (
        <div className="container mt-4">
            <div className="row equal">
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