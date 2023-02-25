/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */
const { db } = require('./database');

//initialize db
module.exports.initDB = () => {
    db.serialize(() => {
        // create wordList table
        db.run("CREATE TABLE IF NOT EXISTS wordList (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, inProgress INT, createdAt TEXT)");

        // create key-word match table
        db.run("CREATE TABLE IF NOT EXISTS keyWordMatchs (id INTEGER PRIMARY KEY AUTOINCREMENT, wordListId INTEGER, key TEXT, value TEXT, que REAL, testCompleted INT, priority INT, createdAt TEXT)");

        // create config table for settings
        db.run("CREATE TABLE IF NOT EXISTS config (language TEXT)");
        
    })
}
