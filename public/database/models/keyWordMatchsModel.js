const { db } = require('../database');

const tableName = "keyWordMatchs";

module.exports.keyWordMatchsModel = { 
    getAll : (where, callback) => {
        db.all(`SELECT * FROM ${tableName} ${where}`, [], (err, rows) => {
            if (err) {
                console.log(err.message);
                return
            }
            callback(rows);
        })
    },
    getById : (id, callback) => {
        db.get(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, row) => {
            if (err) {
                console.log(err.message);
                return;
            }
            callback(row);
        })
    },
    insert : (data) => {
        const { wordListId, key, value, que, testComplated, priority } = data;
        const createdAt = new Date();
        return new Promise((resolve, reject)=>{
            db.run(`INSERT INTO ${tableName} (wordListId, key, value, que, testComplated, priority, createdAt) VALUES(?,?,?,?,?,?,?)`, [
                wordListId, key, value, que, testComplated, priority, createdAt.toTimeString()
            ], function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            })
        })
    },
    updateById : (id, set) => {
        return new Promise((resolve, reject)=>{
            db.run(`UPDATE ${tableName} SET ${set} WHERE id = ?`, [id], err => {
                if (err) reject(err);
                resolve();
            })
        })
    },
    update : (set, where, callback) => {
        db.run(`UPDATE ${tableName} SET ${set} WHERE ${where}`, [], err => {
            callback(err);
        })
    },
    deleteById : (id) => {
        return new Promise((resolve, reject)=>{
            db.run(`DELETE FROM ${tableName} WHERE id = ?`, [id], err => {
                if (err) reject(err);
                resolve();
            })
        })
    }
}
