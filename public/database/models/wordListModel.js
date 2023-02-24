const { db } = require('../database');

const tableName = "wordList"

module.exports.wordListModel = {
    getAll: (where) => {
        if (where === undefined) where = "id != 0";
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM ${tableName} WHERE ${where}`, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            })
        })
    },
    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        })
    },
    insert: (data) => {
        const title = data.title;
        const inProgress = 0;
        const createdAt = new Date();
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO ${tableName} (title, inProgress, createdAt) VALUES(?,?,?)`, [title, inProgress, createdAt.toTimeString()], function (err) {
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
    deleteById: (id) => {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM ${tableName} WHERE id = ?`, [id], err => {
                if (err) reject(err);
                resolve();
            })
        })
    }
}
