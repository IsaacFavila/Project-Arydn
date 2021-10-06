const {Pool, Client} = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  database: 'products',
  host: ''
  port: 5432
});

pool.connect(err => {
  if (err) {
  console.error('connection error', err.stack);
  }
});

module.exports = pool;