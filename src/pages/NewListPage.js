import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeInfoText } from "../redux/navbarSlice";

import Input from "../components/shared/Input";
import ListRow from "../components/WordList/ListRow";

const NewListPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //State
    const [insertedListId, setInsertedListId] = useState(0);
    const [listName, setListName] = useState("Untitled List");
    const [inputKey, setIputKey] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [wordList, setWordList] = useState([]);

    //Input refs
    const keyInputRef = useRef(null);
    const valueInputRef = useRef(null);
    const listNameInputRef = useRef(null);

    useEffect(() => {
        dispatch(changeInfoText("Add New List"));
        return () => {
            dispatch(changeInfoText(undefined));
        }
    })

    const handleTitleUpdate = (e) => {
        if ((insertedListId != 0) && (e.key === 'Enter' || e.key === 'Tab')) {
           updateTitle();
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            addNewItem(e);
        }
    }

    const addNewList = async () => {
        const newListData = { title: listName };
        const newListId = await window.electron.insertWordList(newListData);
        setInsertedListId(newListId);
        listNameInputRef.current.value = listName;
        return newListId;
    }

    const addNewItem = async (e) => {
        e.preventDefault();
        if (inputKey != "" && inputValue != "") {

            let listId = insertedListId;
            if (insertedListId == 0) {
                listId = await addNewList();
            }
            const newMatchData = {
                wordListId: listId,
                key: inputKey,
                value: inputValue,
                que: wordList.length + 1,
                testComplated: 0,
                priority: 1,
            };
            const insertedMatchId = await window.electron.insertKeyWordMatch(newMatchData);

            let newList = [...wordList];
            newList.push({
                id: insertedMatchId,
                keyword: inputKey,
                value: inputValue
            })

            setWordList(newList);
            setInputValue("");
            setIputKey("");
            valueInputRef.current.value = "";
            keyInputRef.current.value = "";
        }
        keyInputRef.current.focus();
    }

    const updateTitle = ()=> {
        const data = { id: insertedListId, setString: `title = \'${listName}\'` }
        return window.electron.updateWordListById(data);
    }

    const deleteWord = (id)=>{
        window.electron.deleteKeyWordMatch(id).then(()=>{
            let newList = [...wordList];
            newList.splice(newList.findIndex(word => word.id === id), 1);
            setWordList(newList);
        });
    }

    const updateWord = (word)=>{
        const { id, keyword, value } = word;
        deleteWord(id);
        keyInputRef.current.value = keyword;
        valueInputRef.current.value = value;
    }

    const saveAndQuit = ()=>{
        updateTitle().then(()=>{
            navigate('/');
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-10">
                    <Input type="text" name="listname" placeholder="Give a name for your list:" onChange={e => setListName(e.target.value)} innerRef={listNameInputRef} onKeyDown={handleTitleUpdate} />
                </div>
                <div className="col-2">
                    {insertedListId == 0
                        ? <Link className="btn btn-outline-warning w-100 mt-4" to='/' >Cancel</Link>
                        : <button className="btn btn-outline-success w-100 mt-4" onClick={saveAndQuit}>Save</button>
                    }
                </div>
                <div className="col-5">
                    <Input type="text" name="key" placeholder="Key:" onChange={e => setIputKey(e.target.value)} innerRef={keyInputRef} />
                </div>
                <div className="col-5">
                    <Input type="text" name="value" placeholder="Value:" onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} innerRef={valueInputRef} />
                </div>
                <div className="col-2">
                    <button className="btn btn-outline-info w-100 mt-4" onClick={addNewItem} >Add Word</button>
                </div>
                <hr className="mt-2" />
            </div>
            {wordList.map((word, index) => {
                return (
                    <ListRow keyword={word.keyword} value={word.value} key={word.id} onDelete={e => deleteWord(word.id)} onUpdate={e => updateWord(word)} />
                )
            })
            }
        </div>
    )
}

export default NewListPage;