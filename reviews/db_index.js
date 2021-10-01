const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'reviewsdb'
});

connection.connect();

module.exports = connection;
  