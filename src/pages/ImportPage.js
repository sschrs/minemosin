/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ListRow from "../components/WordList/ListRow";
import { changeInfoText } from "../redux/navbarSlice";


const ImportPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation()
    const [text, setText] = useState('');
    const [wordSeperator, setWordSeperator] = useState(',');
    const [rowSeperator, setRowSeperator] = useState('\n');
    const [words, setWords] = useState([]);

    useEffect(() => {
        textToList();
    }, [text, wordSeperator, rowSeperator])

    useEffect(()=>{
        dispatch(changeInfoText(t('navbar.importTitle')))
        return () => {
            dispatch(changeInfoText(undefined));
        }
    })

    const textToList = () => {
        let wordList = [];
        const rows = text.split(rowSeperator);
        if (rows.length > 0) {
            rows.forEach(row => {
                let word = row.split(wordSeperator)
                if (word.length >= 2) {
                    wordList.push({ key: word[0], value: word[1] })
                }
            });
        }
        setWords(wordList);
    }

    
    const importList = async () => {
        const listName = t('import.defaultListTitle');
        const newListData = { title: listName };
        const newListId = await window.electron.insertWordList(newListData);
        
        words.map((word, index) => {
            const newMatchData = {
                wordListId: newListId,
                key: word.key,
                value: word.value,
                que: index,
                testCompleted: 0,
                priority: 1,
            };    
            window.electron.insertKeyWordMatch(newMatchData);
        })
        navigate(`/list-detail/${newListId}`);
    }

    return (
        <div className="container mt-5">
            <div>
                <textarea rows="5" className="form-control" placeholder={t('import.textarea.placeholder')} onChange={e => setText(e.target.value)}></textarea>
            </div>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>{t('import.wordSeperator')}:</h4>
                    <div className="form-check" onClick={e => setWordSeperator(',')}>
                        <input className="form-check-input" type="radio" name="word-seperator" defaultChecked={wordSeperator === ','} />
                        <label className="form-check-label">
                            {t('import.comma')} ( , ) <small className="text-muted">{t('import.comma.info')}</small>
                        </label>
                    </div>
                    <div class="form-check" onClick={e => setWordSeperator('\t')}>
                        <input className="form-check-input" type="radio" name="word-seperator" defaultChecked={wordSeperator === '\t'} />
                        <label className="form-check-label">
                            {t('import.tab')} <small className="text-muted">{t('import.tab.info')}</small>
                        </label>
                    </div>
                </div>
                <div className="col-5">
                    <h4>{t('import.rowSeperator')}:</h4>
                    <div className="form-check" onClick={e => setRowSeperator('\n')}>
                        <input className="form-check-input" type="radio" name="row-seperator" defaultChecked={rowSeperator === '\n'} />
                        <label className="form-check-label">
                            {t('import.newLine')} <small className="text-muted">{t('import.newLine.info')}</small>
                        </label>
                    </div>
                    <div class="form-check" onClick={e => setRowSeperator(';')}>
                        <input className="form-check-input" type="radio" name="row-seperator" defaultChecked={rowSeperator === ';'} />
                        <label className="form-check-label">
                            {t('import.semicolon')} ( ; )
                        </label>
                    </div>
                </div>
                <div className="col-2">
                    <button className="btn btn-outline-success w-100 my-1" disabled={words.length <= 0} onClick={importList}>{t('import.importButton')}</button>
                    <Link className="btn btn-outline-warning w-100 my-1" to='/' >{t('shared.cancel')}</Link>
                </div>
            </div>
            <hr />
            {(words.length > 0) && <small className="text-muted">{words.length} {t('import.rows')}</small>}
            <div className="list-row-container">
                {words.map((word, index) => {
                    return (
                        <ListRow keyword={word.key} value={word.value} key={word.id} />
                    )
                })
                }
            </div>

        </div>
    )
}

export default ImportPage;