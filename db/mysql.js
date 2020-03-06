const mysql = require('mysql');
let pool;
module.exports = {
    /**
     * @returns {mysql.Pool}
     */
    getPool: function () {
      if (pool) return pool;

      pool = mysql.createPool({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'workshop'
      });

      return pool;
    }
};