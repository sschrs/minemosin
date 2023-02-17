import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeInfoText } from "../redux/navbarSlice";

import Input from "../components/shared/Input";
import ListRow from "../components/WordList/ListRow";


const NewListPage = () => {
    const dispatch = useDispatch();
    const [listName, setListName] = useState();
    const [inputKey, setIputKey] = useState();
    const [inputValue, setInputValue] = useState();
    const [wordList, setWordList] = useState([]);
    const valueInputRef = useRef(null);

    useEffect(() => {
        dispatch(changeInfoText("Add New List"));
        return () => {
            dispatch(changeInfoText(undefined));
        }
    })


    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            addNewItem(e);
        }
    }

    const addNewItem = (e) => {
        e.preventDefault();
        //TODO DB insert
        valueInputRef.current.focus();
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Input type="text" name="key" placeholder="Give a name for your list:" onChange={e => setListName(e.target.value)} />
                </div>
                <div className="col-5">
                    <Input type="text" name="key" placeholder="Key:" onChange={e => setIputKey(e.target.value)} innerRef={valueInputRef} />
                </div>
                <div className="col-5">
                    <Input type="text" name="value" placeholder="Value:" onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} />
                </div>
                <div className="col-2">
                    <button className="btn btn-outline-success w-100 mt-4" onClick={addNewItem} >Kaydet</button>
                </div>
                <hr className="mt-2" />
            </div>
            {wordList.map((val, index) => {
                return (
                    <ListRow keyword={val.keyword} value={val.value} key={val.id} />
                )
            })
            }
        </div>
    )
}

export default NewListPage;