const {Pool} = require('pg');
const {DB_HOST, DB_PW} = require('../config.js');

const pool = new Pool({
  user: 'postgres',
  host: DB_HOST, // this is the IP of the EC2 instance containing my DB
  database: 'questions_answers',
  password: DB_PW,
  port: 5432
});

pool.connect(err => {
  if (err) {
  console.error('connection error', err.stack);
  } else {
  console.log('questions_answers database connected');
  }
});

module.exports = pool;