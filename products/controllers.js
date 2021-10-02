const models = require('./models');
const promises = require('./promises');

const getProducts = (req, res) => {
  if (Object.keys(req.query).length) {
    var page = Number(req.query.page);
    var count = Number(req.query.count);
  }
  models.getProducts(page, count, (err, products) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(products);
    }
  })
}

const getInfo = (req, res) => {
  var id = Number(req.params.product_id);
  models.getInfo(id, (err, info) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(info);
    }
  })
}

const getStyles = (req, res) => {
  var id = Number(req.params.product_id);
  models.getStylesNew(id, (err, styles) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(styles);
    }
  })
}

const getRelated = (req, res) => {
  var id = Number(req.params.product_id);
  models.getRelated(id, (err, related) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(related);
    }
  })
}

module.exports = {
  getProducts,
  getInfo,
  getStyles,
  getRelated
}