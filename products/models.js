var db = require('./db.js');

const getProducts = (page, count, callback) => {

}
const getInfo = (id, callback) => {
  var queryStr = 'select * from products where id = ?';
  db.query(queryStr, id, (err, results)  => {
    callback(err, results);
  });
}

const getStyles = (id, callback) => {
  var queryStr = 'select * from styles where productId = ?';
  db.query(queryStr, id, (err, results)  => {
    callback(err, results);
  });
}
const getRelated = (id, callback) => {
  var queryStr = 'select * from related where current_product_id = ?';
  db.query(queryStr, id, (err, results)  => {
    callback(err, results);
  });
}

module.exports = {
  getProducts,
  getInfo,
  getStyles,
  getRelated
}

