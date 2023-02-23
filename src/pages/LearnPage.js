/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// components
import MultipleChoice from "../components/LearnMode/MultipleChoice";
import ProgressBar from "../components/LearnMode/ProgressBar";
import Quiz from "../components/LearnMode/Quiz";
import ShowCorrect from "../components/LearnMode/ShowCorrect";
import Complated from "../components/LearnMode/Complated";
// helpers
import { getQuizWordsByQue, getSimilarChoices, getUntestedWordByQue, shuffleWordList, resetWordList } from "../helpers/learnMode";


const LearnPage = () => {
    const { listId } = useParams(); // get wordList id from react-router params    
    /**
     * set panel mode for different components
     * modes: multiple | quiz | show-correct | complated
     * multiple: multiple choice questions
     * quiz: requires input of correct answer
     * complated: in case the list is complate
     */
    const [mode, setMode] = useState('multiple');
    const [showCorrect, setShowCorrect] = useState(false); // to show correction in case of wrong answer
    const [reverse, setReverse] = useState(false); // reverse key-value matches
    const [multipleChoiceTestCount, setMultipleChoiceTestCount] = useState(0); // number of consecutive multiple choice tests
    const [quizCount, setQuizCount] = useState(0); // number of consecutive quizlet
    const [wordList, setWordList] = useState({});
    const [multipleChoices, setMultipleChoices] = useState([]); // choices for multiple choice tests
    const [currentWord, setCurrentWord] = useState({});
    const [questionWord, setQuestionWord] = useState(); // word to ask
    const [answerWord, setAnswerWord] = useState(); // answer of the word
    const [showCorrectData, setShowCorrectData] = useState({});
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        initList();
    }, []);

    useEffect(() => {
        multipleChoiceTest();
    }, [reverse])

    const initList = async () => {
        const _wordList = await window.electron.getWordListById(listId); // get wordList object from db
        setWordList(_wordList); // update state with db object
        if (_wordList.inProgress == 0) shuffleWordList(listId); // if progress is 0 shuffle que
        multipleChoiceTest(); // start multiple choice test
    }

    const multipleChoiceTest = async () => {
        const word = await getUntestedWordByQue(listId); // get the word from db order by que
        if (word) {
            setCurrentWord(word); // update state with db word

            // reverse configuration
            reverse ? setQuestionWord(word.key) : setQuestionWord(word.value);
            reverse ? setAnswerWord(word.value) : setAnswerWord(word.key);

            const choices = await getSimilarChoices(listId, word, reverse); // get similar choices to correct answer
            setMultipleChoices(choices);
        } else {
            setMode('quiz');
            setQuizCount(0);
            quiz();
        }
    }

    /**
     * check if answer is correct or not
     * @param {string} answer 
     */
    const answerMultiple = async (answer) => {
        if (answerWord === answer) {
            await window.electron.updateKeyWordMatchById({ id: currentWord.id, set: 'testComplated = 1' }); // if answer is correct set testComplated to 1
            // update state to show success border for a second
            setIsCorrect(true);
            setTimeout(() => {
                setIsCorrect(false);
            }, 1000)
        } else {
            // prepare data for showCorrect component and update state
            const word = questionWord;
            const wrongAnswer = answer;
            const correctAnswer = answerWord;
            const data = { word, wrongAnswer, correctAnswer };
            setShowCorrectData(data);
            setShowCorrect(true); // to show correction panel
            await window.electron.updateKeyWordMatchById({ id: currentWord.id, set: `que = ${currentWord.que + 10}` }); // move word forward 10 rows

        }
        // continue with multiple choice questions until the number of consecutive tests exceeds 10
        if (multipleChoiceTestCount < 10) {
            multipleChoiceTest();
            setMultipleChoiceTestCount(multipleChoiceTestCount + 1);
        } else {
            setMode('quiz');
            setQuizCount(0);
            quiz();
        }

    }

    const quiz = async () => {
        const word = await getQuizWordsByQue(listId);
        if (word) {
            setCurrentWord(word);
            // reverse configuration
            reverse ? setQuestionWord(word.key) : setQuestionWord(word.value);
            reverse ? setAnswerWord(word.value) : setAnswerWord(word.key);
        } else {
            setMode('complated');
        }
    }

    const answerQuiz = async (answer) => {
        let addQue;
        let addPriority;
        if (answer === answerWord) {
            addPriority = -1;
            currentWord.priority <= 1 ? addQue = 0 : addQue = 24 / (currentWord.priority + addPriority)
            window.electron.updateKeyWordMatchById({ id: currentWord.id, set: `priority = ${currentWord.priority + addPriority}, que = ${currentWord.que + addQue}` })
            setIsCorrect(true);
            setTimeout(() => {
                setIsCorrect(false);
            }, 1000)
        } else {
            addQue = 24 / (currentWord.priority + 1)
            currentWord.priority >= 5 ? addPriority = 0 : addPriority = 1;
            window.electron.updateKeyWordMatchById({ id: currentWord.id, set: `priority = ${currentWord.priority + addPriority}, que = ${currentWord.que + addQue}` })
            const word = questionWord;
            const wrongAnswer = answer;
            const correctAnswer = answerWord;
            const data = { word, wrongAnswer, correctAnswer };
            setShowCorrectData(data);
            setShowCorrect(true); // to show correction panel
        }
        if (quizCount < 5) {
            quiz();
            setQuizCount(quizCount + 1);
        } else {
            setMode('multiple')
            setMultipleChoiceTestCount(0);
            multipleChoiceTest();
        }
    }

    const closeCorrectAnswerPanel = () => {
        setShowCorrect(false);
    }

    const resetProgress = ()=>{
        let response = window.confirm('Are you sure to reset your progress');
        if (response) resetWordList(listId);
        initList();
    }

    return (
        <div className="row justify-content-center ">
            <div className="col-10">
                <div class="switch-box is-success ms-2">
                    <input id="success" class="switch-box-input" type="checkbox" onChange={e => setReverse(e.target.checked)} />
                    <label for="success" class="switch-box-slider"></label>
                    <label for="success" class="switch-box-label"> <span style={{ verticalAlign: 'middle' }}> Reverse List</span></label>
                    <Link className="btn btn-outline-warning btn-sm" style={{float: 'right'}} to={`/list-detail/${listId}`} >Cancel</Link>
                    <button className="btn btn-outline-danger btn-sm me-2" style={{float: 'right'}} onClick={resetProgress} >Reset Progress</button>
                </div>
                {(mode === 'multiple' && !showCorrect) && <MultipleChoice word={questionWord} correctAnswer={answerWord} choices={multipleChoices} answerMultiple={answerMultiple} isCorrect={isCorrect} />}
                {(mode === 'quiz' && !showCorrect) && <Quiz word={questionWord} answerQuiz={answerQuiz} isCorrect={isCorrect} />}
                {(mode === 'complated') && <Complated listId={listId} />}
                {(showCorrect) && <ShowCorrect showCorrectData={showCorrectData} closePanel={closeCorrectAnswerPanel} />}
                <ProgressBar listId={listId} />
            </div>
        </div>
    )
}

export default LearnPage;