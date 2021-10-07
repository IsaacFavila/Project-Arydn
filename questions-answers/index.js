const {Pool} = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '3.144.159.12', // this is the IP of the EC2 instance containing my DB
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