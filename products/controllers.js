var models = require('./models.js');

const getProducts = (req, res) => {
  // res.send('Products');
  models.getProducts(req.body.page, req.body.count, (err, products) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(products.rows);
      res.status(200).json(products.rows);
    }
  })
}

const getInfo = (req, res) => {
  // res.send('Product info');
  models.getInfo(req.body.id, (err, info) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(info.rows);
      res.status(200).json(info.rows);
    }
  })
}

const getStyles = (req, res) => {
  models.getStyles(req.body.id, (err, styles) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(styles.rows);
      res.status(200).json(styles.rows);
    }
  })
}

const getRelated = (req, res) => {
  models.getRelated(req.body.id, (err, related) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(related.rows);
      res.status(200).json(related.rows);
    }
  })
}

module.exports = {
  getProducts,
  getInfo,
  getStyles,
  getRelated
}