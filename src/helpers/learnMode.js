/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */

import levenSort from "leven-sort";

/**
 * Fisher–Yates Algorithm to shuffle an array
 * @param {array} array - array will be shuffled
 * @returns {array} - shuffled array
 */
const shuffleArray = (array) => {
    let currentIndex = array.length
    let randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * shuffle word list que for learning mode
 * @param {number} wordListId 
 */
export const shuffleWordList = async (wordListId) => {
    const words = await window.electron.getAllKeyWordMatchs(`wordListId = ${wordListId}`);
    const shuffledArray = shuffleArray(words);
    shuffledArray.map((word, index) => {
        const data = {
            id: word.id,
            set: `que = ${index}`
        };
        window.electron.updateKeyWordMatchById(data);
    });
    await window.electron.updateWordListById({ id: wordListId, setString: 'inProgress = 1' })
}

/**
 * reset progress for wordList
 * @param {number} wordListId 
 */
export const resetWordList = async (wordListId) => {
    await window.electron.updateWordListById({ id: wordListId, setString: 'inProgress = 0' }); // update inProgress in wordList
    await window.electron.updateKeyWordMatch({ where: `wordListId = ${wordListId}`, setString: 'testCompleted = 0, priority = 1' }); // update all matchs in wordList
}

/**
 * get untested words by que
 * @param {number} wordListId 
 * @returns {string} - untested word
 */
export const getUntestedWordByQue = async (wordListId) => {
    const data = { where: `wordListId = ${wordListId} AND testCompleted = 0`, limit: 1 }
    const words = await window.electron.getAllKeyWordMatchsWithLimitByQue(data);
    if (words.length > 0) return words[0];
    return undefined;
}

/**
 * get tested but not completed words
 * @param {number} wordListId 
 * @returns {string} - word
 */
export const getQuizWordsByQue = async (wordListId) => {
    const data = {
        where: `wordListId = ${wordListId} AND testCompleted = 1 AND priority != 0`,
        limit: 1
    }
    const words = await window.electron.getAllKeyWordMatchsWithLimitByQue(data);
    if (words.length > 0) return words[0];
    return undefined;
}

/**
 * get similar choices for one word
 * @param {number} wordListId 
 * @param {string} word 
 * @param {boolean} reverse 
 * @returns {array} - similar words
 */
export const getSimilarChoices = async (wordListId, word, reverse = false) => {
    const words = await window.electron.getAllKeyWordMatchs(`wordListId = ${wordListId}`)
    let strings = new Array();
    words.forEach(word => {
        reverse ? strings.push(word.value) : strings.push(word.key);
    });
    let sorted;
    reverse ? sorted = levenSort(strings, word.value) : sorted = levenSort(strings, word.key);
    return shuffleArray(sorted.slice(0, 4));
}

/**
 * check is an answer correct
 * split by comma and check if correct answer includes the given answer
 * @param {string} answer 
 * @param {string} correctAnswer 
 * @returns {boolean} isCorrect
 */
export const checkQuizAnswer = (answer, correctAnswer) => {
    const answerList = answer.split(',');
    const correctList = correctAnswer.split(',');
    var isCorrect = true;
    answerList.map((value, index) => {
        answerList[index] = value.toLowerCase().trim();
    })

    correctList.map((value, index) => {
        correctList[index] = value.toLowerCase().trim();
    })

    answerList.forEach(word => {
        if (!correctList.includes(word)) isCorrect = false;
    });
    return isCorrect;
}
