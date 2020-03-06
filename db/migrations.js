const utils = require('./utils.js')
let createTableUser = `
    CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(255),
        name VARCHAR(255),
        password TEXT,
        CONSTRAINT users_username_unique UNIQUE (username),
        PRIMARY KEY (id)
    );
`

utils.migrate([createTableUser])
