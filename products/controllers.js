const models = require('./models');
const promises = require('./promises');

const getProducts = (req, res) => {
  if (req.url !== '/products') {
    var urlParams = req.url.split('?').slice(1)[0].split('&');
    var page = Number(urlParams[0].substring(urlParams[0].indexOf('=') + 1));
    var count = Number(urlParams[1].substring(urlParams[1].indexOf('=') + 1));
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
  var urlParams = req.url.split('/');
  var id = Number(urlParams[urlParams.length - 1]);
  models.getInfo(id, (err, info) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(info);
    }
  })
}

const getStyles = (req, res) => {
  var urlParams = req.url.split('/');
  var id = Number(urlParams[urlParams.length - 2]);
  models.getStyles(id, (err, styles) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(styles);
    }
  })
}

const getRelated = (req, res) => {
  var urlParams = req.url.split('/');
  var id = Number(urlParams[urlParams.length - 2]);
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