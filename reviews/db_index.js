const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'reviewsdb'
});

connection.connect(function(error) {
  if(error) {
		return console.log('Connection Error', error);
	}

	console.log('Connected to mySQL Server');
});

module.exports = connection;
  