const { db } = require('../database');

const tableName = "wordList"

module.exports.wordListModel = {
    getAll: (where, callback) => {
        db.all(`SELECT * FROM ${tableName} ${where}`, [], (err, rows) => {
            if (err) {
                console.log(err.message);
                return
            }
            callback(rows);
        })
    },
    getById: (id, callback) => {
        db.get(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, row) => {
            if (err) {
                console.log(err.message);
                return;
            }
            callback(row);
        })
    },
    insert: (data) => {
        const title = data.title;
        const createdAt = new Date();
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO ${tableName} (title, createdAt) VALUES(?,?)`, [title, createdAt.toTimeString()], function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            })
        })

    },
    updateById: (id, set) => {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE ${tableName} SET ${set} WHERE id = ?`, [id], err => {
                if (err) reject(err);
                resolve();
            })
        })

    },
    update: (set, where, callback) => {
        db.run(`UPDATE ${tableName} SET ${set} WHERE ${where}`, [], err => {
            callback(err);
        })
    },
    deleteById: (id, callback) => {
        db.run(`DELETE FROM ${tableName} WHERE id = ?`, [id], err => {
            callback(err);
        })
    }
}
