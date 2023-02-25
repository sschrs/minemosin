/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */
const isDev = require('electron-is-dev');
const path = require('path');
const sqlite3 = require('sqlite3');

/**
 * sqlite3 connection
 */
module.exports.db = new sqlite3.Database(
  isDev
    ? path.join(__dirname, '../../db/database.db') // in development
    : path.join(process.resourcesPath, 'db/database.db'), // in production
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.log(`Database Error: ${err}`);
    } else {
      console.log('Database Loaded');
    }
  }
);