const models = require('./models');

const getProducts = (req, res) => {
  models.getProducts(req.body.page, req.body.count, (err, products) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(products);
    }
  })
}

const getInfo = (req, res) => {
  models.getInfo(req.body.id, (err, info) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(info);
    }
  })
}

const getStyles = (req, res) => {
  models.getStyles(req.body.id, (err, styles) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(styles);
    }
  })
}

const getRelated = (req, res) => {
  models.getRelated(req.body.id, (err, related) => {
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