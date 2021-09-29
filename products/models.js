const pool = require('./db.js');

const getProducts = (page=1, count=5, callback) => {
  var queryStr = `select * from products limit ${count} offset ${(page - 1) * count}`;
  pool.query(queryStr, (err, results) => {
    callback(err, results);
  });
}
const getInfo = (id, callback) => {
  var queryStr = `select * from products where id = ${id}`;
  // add features
  pool.query(queryStr, (err, results)  => {
    callback(err, results);
  });
}

const getStyles = (id, callback) => {
  var queryStr = `select * from styles where productId = ${id}`;
  // add photos and skus
  pool.query(queryStr, (err, results)  => {
    callback(err, results);
  });
}
const getRelated = (id, callback) => {
  var queryStr = `select * from related where current_product_id = ${id}`;
  pool.query(queryStr, (err, results)  => {
    callback(err, results);
  });
}

module.exports = {
  getProducts,
  getInfo,
  getStyles,
  getRelated
}

