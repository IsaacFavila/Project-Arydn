var promise = require('./promises');
var router = require('express').Router();

router.get('/products', promise.getProducts);
router.get('/products/:product_id', promise.getInfo);
router.get('/products/:product_id/styles', promise.getStyles);
router.get('/products/:product_id/related', promise.getRelated);

module.exports = router;