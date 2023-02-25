const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    //events of word lists
    getAllWordLists: (data) => ipcRenderer.invoke('db.selectAll.wordList', data),
    getWordListById: (data) => ipcRenderer.invoke('db.selectById.wordList', data),
    insertWordList: (data) => ipcRenderer.invoke('db.insert.wordList', data),
    updateWordListById: (data) => ipcRenderer.invoke('db.updateById.wordList', data),
    deleteWordListById: (data) => ipcRenderer.invoke('db.deleteById.wordList', data),

    //events of key-word matchs
    getAllKeyWordMatchs: (data) => ipcRenderer.invoke('db.selectAll.keyWordMatch', data),
    getAllKeyWordMatchsWithLimitByQue: (data) => ipcRenderer.invoke('db.selectAllWithLimitByQue.keyWordMatch', data),
    getCount: (data) => ipcRenderer.invoke('db.getCount.keyWordMatch', data),
    insertKeyWordMatch: (data) => ipcRenderer.invoke('db.insert.keyWordMatch', data),
    deleteKeyWordMatch: (data) => ipcRenderer.invoke('db.delete.keyWordMatch', data),
    updateKeyWordMatch: (data) => ipcRenderer.invoke('db.update.keyWordMatch', data),
    updateKeyWordMatchById: (data) => ipcRenderer.invoke('db.updateById.keyWordMatch', data),
    deleteKeyWordMatchByWordListId: (data) => ipcRenderer.invoke('db.deleteByWordListId.keyWordMatch', data),

    //change language
    getLanguage: (data) => ipcRenderer.invoke('config.getLang', data),
    changeLanguage: (data) => ipcRenderer.invoke('config.changeLang', data),

    // open in browser
    openInBrowser: (link) => ipcRenderer.invoke('openInBrowser', link),

    // dialog
    dialog: (data) => ipcRenderer.invoke('dialog', data)
});