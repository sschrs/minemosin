/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */
const { db } = require('../database');

const tableName = "keyWordMatchs";

module.exports.keyWordMatchsModel = {
    getAll: (where = 'id != 0') => {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM ${tableName} WHERE ${where}`, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            })
        });
    },
    getAllWithLimitByQue: (where, limit) => {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM ${tableName} WHERE ${where} ORDER BY que ASC LIMIT ${limit} `, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            })
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
    getCount: (where = 'id != 0') => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT COUNT(*) AS 'count' FROM ${tableName} WHERE ${where}`, [], (err, row)=>{
                if(err) reject(err);
                resolve(row.count);
            })
        })
    },
    insert: (data) => {
        const { wordListId, key, value, que, testCompleted, priority } = data;
        const createdAt = new Date();
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO ${tableName} (wordListId, key, value, que, testCompleted, priority, createdAt) VALUES(?,?,?,?,?,?,?)`, [
                wordListId, key, value, que, testCompleted, priority, createdAt.toTimeString()
            ], function (err) {
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
    update: (where, set) => {
        return new Promise((resolve, reject) => {
            console.log(`UPDATE ${tableName} SET ${set} WHERE ${where}`)
            db.run(`UPDATE ${tableName} SET ${set} WHERE ${where}`, [], err => {
                if (err) reject(err);
                resolve();
            })
        })
    },
    deleteByWordListId : (wordListId) => {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM ${tableName} WHERE wordListId = ?`, [wordListId], err => {
                if (err) reject(err);
                resolve();
            })
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
