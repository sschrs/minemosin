/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */

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
        console.log(word.key)
        const data = { 
            id : word.id,
            set: `que = ${index}`
         };
        window.electron.updateKeyWordMatchById(data);
    });
}