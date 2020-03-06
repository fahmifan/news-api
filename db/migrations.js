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

let createTableContent = `
    CREATE TABLE IF NOT EXISTS contents (
        id INT NOT NULL AUTO_INCREMENT,
        author_id INT NOT NULL,
        title TEXT,
        slug VARCHAR(3072),
        body TEXT,
        CONSTRAINT contents_slug_unique UNIQUE (slug),
        PRIMARY KEY (id)
    )
`

utils.migrate([createTableUser, createTableContent])
