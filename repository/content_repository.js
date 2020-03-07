const utils = require('./utils')
const slugify = require('slugify')
const mysql = require('../db/mysql')

const pool = mysql.getPool()
const MAX_SIZE = 50

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

exports.findAll = ({ size = 0, page = 0 }) => {
    if (!page || page < 1) {
        page = 1
    }

    if (!size || size <= 0 || size > 50) {
        size = MAX_SIZE
    }

    // for first page, offset is 0
    const offset = size * (page-1)
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                console.error(err)
                reject(err)
                return
            }

            const q = `SELECT * FROM contents limit ? offset ?`
            conn.query(q, [size, offset], (err, res) => {
                if (err) {
                    console.error(err)
                    reject(err)
                    return
                }

                // transform res to array of simple object
                resolve(res.map(r => utils.objectifyRawPacket(r)))
            })
        })
    })
}

exports.update = ({ id = 0, title = '', body = '' }) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                console.error(err)
                reject(err)
                return
            }

            const slug = createUniqueSlug(title)

            const q = `UPDATE contents SET title = ?, body = ?, slug = ? WHERE id = ?`
            conn.query(q, [title, body, slug, id], (err, res) => {
                conn.release()

                if (err) {
                    console.error(err)
                    reject(err)
                    return
                }

                const id = res.insertedId
                resolve({ id, title, body, slug })
            })
        })
    })
}

exports.findByID = (id = 0) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                console.error(err)
                reject(err)
                return
            }

            const q = `SELECT * FROM contents where id = ? limit 1`
            conn.query(q, [id], (err, res) => {
                if (err) {
                    console.error(err)
                    reject(err)
                    return
                }

                if (res.length <= 0) {
                    resolve(null)
                    return
                }

                // transform res to array of simple object
                resolve(utils.objectifyRawPacket(res[0]))
            })
        })
    })
}
