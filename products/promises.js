const pool = require('./db');

const getProducts = (page=1, count=5, callback) => {
  var queryStr = `select * from products limit ${count} offset ${(page - 1) * count}`;
  pool.query(queryStr)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log(err);
    })
}

const getInfo = (id, callback) => {

}

const getStyles = (id, callback) => {

}

const getRelated = (id, callback) => {
  var queryStr = `select json_agg(related_product_id) from related where current_product_id = ${id}`;
  pool.query(queryStr)
    .then((response) => {
      res.send(response.rows[0].json_agg);
    })
    .catch((err) => {
      console.log(err);
    })
}

module.exports = {
  getProducts,
  getInfo,
  getStyles,
  getRelated
}