const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    //events of word lists
    insertWordList: (data) => ipcRenderer.invoke('db.insert.wordList', data),
    updateWordListById: (data) => ipcRenderer.invoke('db.updateById.wordList', data),

    //events of key-word matchs
    insertKeyWordMatch: (data) => ipcRenderer.invoke('db.insert.keyWordMatch', data),
    deleteKeyWordMatch: (data) => ipcRenderer.invoke('db.delete.keyWordMatch', data)

});