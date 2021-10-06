const {Pool} = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'questions_answers',
  password: 'postgrespw',
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