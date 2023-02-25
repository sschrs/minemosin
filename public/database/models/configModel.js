/**
 * @author Süleyman Özarslan
 * @version 1.0.0
 */
const { db } = require('../database');

const tableName = "config"

module.exports.configModel = {
    /**
     * get current language record from db
     * @returns {promise}
     */
    getLanguage: ()=>{
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM config", [], (err, row) => {
                if (err) reject(err)
                resolve(row.language)
            })
        })
    },
    /**
     * update language in db
     * @param {string} lang 
     * @returns {promise}
     */
    changeLanguage: (lang) => {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE ${tableName} SET language = ?`, [lang], err => {
                if (err) reject(err);
                resolve();
            })
        })
    }
}
