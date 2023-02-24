/**
 * @author Süleyman Özarslan
 * @version 1.0.0 
 */
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeInfoText } from "../redux/navbarSlice";

import Input from "../components/shared/Input";
import ListRow from "../components/WordList/ListRow";
import { useTranslation } from "react-i18next";

/**
 * Add a new list or edit existing one
 * if listId exists -> edit list
 * if listId not exists -> add new list
 */
const NewListPage = () => {
    const { listId } = useParams(); // get id from react-router params | if exists edit the list
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [insertedListId, setInsertedListId] = useState(listId ? listId : 0); // if listId not exists (new-list) initial with 0
    const [listName, setListName] = useState("Untitled List");
    const [inputKey, setIputKey] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [keyWordMatchs, setKeyWordMatchs] = useState([]);
    const [wordList, setWordList] = useState({});

    //Input refs
    const keyInputRef = useRef(null);
    const valueInputRef = useRef(null);
    const listNameInputRef = useRef(null);

    useEffect(() => {
        listId ? dispatch(changeInfoText(t('navbar.editList'))) : dispatch(changeInfoText(t('navbar.addList'))) // change info text in the navbar according to listId
        /**
         * if listId exists get relevant records from db
         */
        if (listId) {
            getSavedList();
            getWords();
        }
        return () => {
            dispatch(changeInfoText(undefined)); // change info text to undefined again before unmount
        }
    }, [])

    /**
     * get wordList record from db according to listId
     */
    const getSavedList = async () => {
        const wordListDB = await window.electron.getWordListById(listId);
        setWordList(wordListDB);
        listNameInputRef.current.value = wordListDB.title;
        setListName(wordListDB.title);
    }
    /**
     * get key-word matchs from db according to listId
     */
    const getWords = async () => {
        const words = await window.electron.getAllKeyWordMatchs(`wordListId = ${listId}`);
        setKeyWordMatchs(words);
    }
    /**
     * update list title in case e.key is enter or tab from list name input
     * @param {object} e - event of input
     */
    const handleTitleUpdate = (e) => {
        if ((insertedListId != 0) && (e.key === 'Enter' || e.key === 'Tab')) {
            updateTitle();
        }
    }
    /**
     * add new key-word match in case e.key is enter or tab
     * @param {object} e - event of input 
     */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            addNewItem(e);
        }
    }

    /**
     * insert new list to db and returns id of new list
     * @returns {number} - id of inserted list
     */
    const addNewList = async () => {
        const newListData = { title: listName };
        const newListId = await window.electron.insertWordList(newListData);
        setInsertedListId(newListId); // update state with new list id
        listNameInputRef.current.value = listName; // update value of list name input
        return newListId;
    }
    /**
     * insert new key-word match to db and update state
     * @param {object} e - event of button
     */
    const addNewItem = async (e) => {
        e.preventDefault();
        if (inputKey != "" && inputValue != "") {
            let listId = insertedListId;
            if (insertedListId == 0) {
                listId = await addNewList();
            }
            // create data object with state
            const newMatchData = {
                wordListId: listId,
                key: inputKey,
                value: inputValue,
                que: keyWordMatchs.length + 1,
                testCompleted: 0,
                priority: 1,
            };
            const insertedMatchId = await window.electron.insertKeyWordMatch(newMatchData); // get id of inserted match

            // update state with new match
            let newList = [...keyWordMatchs];
            newList.push({
                id: insertedMatchId,
                key: inputKey,
                value: inputValue
            })
            setKeyWordMatchs(newList);

            // clean state and inputs
            setInputValue("");
            setIputKey("");
            valueInputRef.current.value = "";
            keyInputRef.current.value = "";
        }
        keyInputRef.current.focus(); // refocus to key-input
    }

    /**
     * update title of list
     * @returns {promise} - 
     */
    const updateTitle = () => {
        const data = { id: insertedListId, setString: `title = \'${listName}\'` }
        return window.electron.updateWordListById(data);
    }

    /**
     * delete word according to its id
     * @param {number} id - id of word to delete 
     */
    const deleteWord = (id) => {
        window.electron.deleteKeyWordMatch(id).then(() => {
            let newList = [...keyWordMatchs];
            newList.splice(newList.findIndex(word => word.id === id), 1);
            setKeyWordMatchs(newList);
        });
    }

    /**
     * delete a word and set input values to update it
     * @param {object} word - word (key-word match)
     */
    const updateWord = (word) => {
        const { id, keyword, value } = word;
        deleteWord(id);
        keyInputRef.current.value = keyword;
        valueInputRef.current.value = value;
    }

    /**
     * update title and navigate back 
     */
    const saveAndQuit = () => {
        updateTitle().then(() => {
            listId ? navigate(`/list-detail/${listId}`) : navigate('/');
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-10">
                    <Input type="text" name="listname" placeholder={t('newList.listNameInput.placeholder')} onChange={e => setListName(e.target.value)} innerRef={listNameInputRef} onKeyDown={handleTitleUpdate} />
                </div>
                <div className="col-2">
                    {insertedListId == 0
                        ? <Link className="btn btn-outline-warning w-100 mt-4" to='/' >{t('shared.cancel')}</Link>
                        : <button className="btn btn-outline-success w-100 mt-4" onClick={saveAndQuit}>{t('shared.save')}</button>
                    }
                </div>
                <div className="col-5">
                    <Input type="text" name="key" placeholder={t('shared.key')} onChange={e => setIputKey(e.target.value)} innerRef={keyInputRef} />
                </div>
                <div className="col-5">
                    <Input type="text" name="value" placeholder={t('shared.value')} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} innerRef={valueInputRef} />
                </div>
                <div className="col-2">
                    <button className="btn btn-outline-info w-100 mt-4" onClick={addNewItem} >{t('newList.addWord')}</button>
                </div>
                <hr className="mt-2" />
            </div>
            <div className="list-row-container">
                {keyWordMatchs.map((word, index) => {
                    return (
                        <ListRow isEditable={true} keyword={word.key} value={word.value} key={word.id} onDelete={e => deleteWord(word.id)} onUpdate={e => updateWord(word)} />
                    )
                })
                }
            </div>
        </div>
    )
}

export default NewListPage;