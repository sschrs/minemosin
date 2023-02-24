const { db } = require('../database');

const tableName = "config"

module.exports.configModel = {
    getLanguage: ()=>{
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM config", [], (err, row) => {
                if (err) reject(err)
                resolve(row.language)
            })
        })
    },
    changeLanguage: (lang) => {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE ${tableName} SET language = ?`, [lang], err => {
                if (err) reject(err);
                resolve();
            })
        })
    }
}
