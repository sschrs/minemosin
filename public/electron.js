const { app, BrowserWindow, ipcMain, shell } = require('electron');
const isDev = require('electron-is-dev'); // to check if electron is in development mode
const path = require('path');
const { initDB } = require('./database/init');
const { initialDBEvents } = require('./database/events');
const { wordListModel } = require('./database/models/wordListModel');

// initialize db with tables
initDB();

/**
 * create main window
 * @returns window object
 */
const createWindow = () => {
    let mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            // development mode check
            preload: isDev
                ? path.join(app.getAppPath(), './public/preload.js')
                : path.join(app.getAppPath(), './build/preload.js'),
            contextIsolation: true,
            nodeIntegration: true
        },
    });

    mainWindow.setIcon(path.join(__dirname, 'assets/icon.png'));

    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    return mainWindow;
};

app.whenReady().then(() => {
    createWindow();
});


app.on('window-all-closed', () => {
    app.quit();
});


ipcMain.handle('openInBrowser', (event, link) => {
    shell.openExternal(link);
})

// init ipcMain handlers for db actions
initialDBEvents();