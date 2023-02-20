const { ipcRenderer, ipcMain } = require("electron");
const { keyWordMatchsModel } = require("./models/keyWordMatchsModel");
const { wordListModel } = require("./models/wordListModel");


module.exports.initialDBEvents = ()=>{
    ipcMain.handle("db.insert.wordList", (event, data)=>{
        return wordListModel.insert(data)
    })

    ipcMain.handle('db.updateById.wordList', (event, data)=>{
        const { id, setString } = data;
        return wordListModel.updateById(id,setString);
    })

    ipcMain.handle("db.insert.keyWordMatch", (event, data)=>{
        return keyWordMatchsModel.insert(data);
    })

    ipcMain.handle('db.delete.keyWordMatch', (event, data)=>{
        return keyWordMatchsModel.deleteById(data);
    })

   
}
