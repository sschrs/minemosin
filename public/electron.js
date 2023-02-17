const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev'); // to check if electron is in development mode
const path = require('path');




const createWindow = () => {
    let mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {

            preload: isDev
                ? path.join(app.getAppPath(), './public/preload.js')
                : path.join(app.getAppPath(), './build/preload.js'),
            contextIsolation: true,
            nodeIntegration: true
        },
    });

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
