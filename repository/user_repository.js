const utils = require('./utils')
const db = require('../db/mysql.js')
const pool = db.getPool()

exports.findByUsername = (username) => new Promise((resolve, reject) =>{
    pool.getConnection((err, conn) => {
        if (err) {
            reject(err)
            return
        }

        conn.query(`SELECT * FROM users WHERE username = ?`, [username], (err, res) => {
            conn.release()

            if (err) {
                console.error(err)
                reject(err)
                return
            }

            let obj = utils.objectifyRawPacket(res[0])
            console.log(obj)
            resolve(obj)
        })
    })
})

exports.create = ({ username = '', name = '', password = '' }) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                console.error(err)
                return
            }
            
            const q = `INSERT INTO users (username, name, password) VALUES(?, ?, ?)`
            conn.query(q, [username, name, password], (err, res) => {
                conn.release()

                if (err) {
                    console.error(err)
                    reject(err)
                    return
                }

                let id = res.insertId
                resolve({ username, name, id })
            })
        })
    })
}
