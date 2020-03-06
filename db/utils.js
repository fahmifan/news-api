const db = require('./mysql')
const pool = db.getPool()

exports.migrate = (queries = []) => {
    pool.getConnection((err, conn) => {
        if (err) {
            console.error(err)
            return
        }
    
        queries.forEach(q => {
            conn.query(q, (err, result) => {
                if (err) {
                    console.error(err)

                    conn.release()
                    return
                }
            })
        })

        conn.release()
        pool.end()
    })
}

module.exports = exports