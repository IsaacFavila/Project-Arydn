const pool = require('./db');

const getProducts = (req, res) => {
  if (Object.keys(req.query).length) {
    var page = Number(req.query.page);
    var count = Number(req.query.count);
  }
  var queryStr = `select * from products limit ${count} offset ${(page - 1) * count}`;
  pool.query(queryStr)
    .then({rows} => {
      res.status(200).json(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    })
}

const getInfo = (req, res) => {
  var id = Number(req.params.product_id);
  var queryStr = `select * from products where id = ${id}`;
  pool.query(queryStr)
    .then({rows} => {
      var product = rows[0];
      queryStr = `select feature, value from features f where f.product_id = ${id}`;
      pool.query(queryStr)
        .then({rows} => {
          product.features = rows
          res.status(200).json(product);
        })
        .catch(err => {
          res.status(500).send(err);
        })
    })
    .catch(err => {
      res.status(500).send(err);
    })
}

const getStyles = (req, res) => {
  var id = Number(req.params.product_id);

}

const getRelated = (req, res) => {
  var id = Number(req.params.product_id);
  var queryStr = `select json_agg(related_product_id) from related where current_product_id = ${id}`;
  pool.query(queryStr)
    .then({rows} => {
      res.status(200).json(rows[0].json_agg);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

module.exports = {
  getProducts,
  getInfo,
  getStyles,
  getRelated
}