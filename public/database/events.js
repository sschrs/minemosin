/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */
const { ipcMain } = require("electron");
const { keyWordMatchsModel } = require("./models/keyWordMatchsModel");
const { wordListModel } = require("./models/wordListModel");
const { configModel } = require('./models/configModel')

/**
 * handle ipcRenderer requests from react and perform database actions
 */
module.exports.initialDBEvents = () => {
    // wordList table
    ipcMain.handle('db.selectAll.wordList', (event, data) => {
        return wordListModel.getAll(data);
    })

    ipcMain.handle('db.selectById.wordList', (event, data) => {
        return wordListModel.getById(data);
    })

    ipcMain.handle("db.insert.wordList", (event, data) => {
        return wordListModel.insert(data)
    })

    ipcMain.handle('db.updateById.wordList', (event, data) => {
        const { id, setString } = data;
        return wordListModel.updateById(id, setString);
    })

    ipcMain.handle('db.deleteById.wordList', (event, data) => {
        return wordListModel.deleteById(data);
    })

    // keyWordMatch table
    ipcMain.handle('db.selectAll.keyWordMatch', (event, data) => {
        return keyWordMatchsModel.getAll(data);
    })

    ipcMain.handle('db.selectAllWithLimitByQue.keyWordMatch', (event, data) => {
        const { where, limit } = data;
        return keyWordMatchsModel.getAllWithLimitByQue(where, limit);
    })

    ipcMain.handle('db.getCount.keyWordMatch', (event, data) => {
        return keyWordMatchsModel.getCount(data);
    })

    ipcMain.handle("db.insert.keyWordMatch", (event, data) => {
        return keyWordMatchsModel.insert(data);
    })


    ipcMain.handle('db.delete.keyWordMatch', (event, data) => {
        return keyWordMatchsModel.deleteById(data);
    })

    ipcMain.handle('db.deleteByWordListId.keyWordMatch', (event, data) => {
        return keyWordMatchsModel.deleteByWordListId(data);
    })

    ipcMain.handle('db.update.keyWordMatch', (event, data) => {
        const { where, setString } = data;
        return keyWordMatchsModel.update(where, setString);
    })

    ipcMain.handle('db.updateById.keyWordMatch', (event, data) => {
        const { id, set } = data;
        return keyWordMatchsModel.updateById(id, set);
    })

    // config table
    ipcMain.handle('config.getLang', (event, data)=>{
        return configModel.getLanguage();
    })

    ipcMain.handle('config.changeLang', (event, data)=>{
        return configModel.changeLanguage(data);
    })

}
