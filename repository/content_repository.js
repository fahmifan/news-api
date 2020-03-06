const utils = require('./utils')
const slugify = require('slugify')
const mysql = require('../db/mysql')

const pool = mysql.getPool()

const createUniqueSlug = (text) => {
    const unique = (new Date()).getTime()
    return slugify(text, '-') + '-' + unique
}

exports.create = ({ author_id = 0, title = '', body = '' }) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                console.error(err)
                reject(err)
                return
            }

            const slug = createUniqueSlug(title)

            const q = `INSERT INTO contents (author_id, title, body, slug) VALUES(?, ?, ?, ?)`
            conn.query(q, [author_id, title, body, slug], (err, res) => {
                conn.release()

                if (err) {
                    console.error(err)
                    reject(err)
                    return
                }

                const id = res.insertedId
                resolve({ id, author_id, title, body, slug })
            })
        })
    })
}
