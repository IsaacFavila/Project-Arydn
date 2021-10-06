const Pool = require('pg').pool;

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  database: 'products',
  host: ''
  port: 5432
});

// pool.connect(err => {
//   if (err) {
//   console.error('connection error', err.stack);
//   }
// });

pool.query('select name from products where id = 1')
  .then(data => {
    console.log('server connected to ubuntu database');
  })

module.exports = pool;