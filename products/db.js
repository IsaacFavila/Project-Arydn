const {Pool, Client} = require('pg');

const pool = new Pool({
  user: 'isaacmfavila',
  host: 'localhost',
  database: 'products',
  password: '',
  port: 5432
});

pool.connect(err => {
  if (err) {
  console.error('connection error', err.stack);
  } else {
  console.log('products database connected');
  }
});

module.exports = pool;
