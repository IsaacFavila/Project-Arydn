const pool = require('./db.js');

const getProducts = (page=1, count=5, callback) => {
  var queryStr = `select * from products limit ${count} offset ${(page - 1) * count}`;
  pool.query(queryStr, (err, results) => {
    console.log(results.rows);
    callback(err, results.rows);
  });
}

const getInfo = (id, callback) => {
  var queryStr = `select * from products where id = ${id}`;
  // add features
  pool.query(queryStr, (err, results)  => {
    console.log(results.rows);
    callback(err, results.rows);
  });
}

const getStyles = (id, callback) => {
  var queryStr = `select * from styles where productId = ${id}`;
  // add photos and skus
  pool.query(queryStr, (err, results)  => {
    console.log(results.rows);
    callback(err, results.rows);
  });
}
const getRelated = (id, callback) => {
  var queryStr = `select related_product_id from related where current_product_id = ${id}`;
  pool.query(queryStr, (err, results)  => {
    var helperArr =[];
    for (var i = 0; i < results.rows.length; i++) {
      helperArr.push(results.rows[i].related_product_id);
    }
    console.log(helperArr);
    callback(err, helperArr);
  });
}

module.exports = {
  getProducts,
  getInfo,
  getStyles,
  getRelated
}

