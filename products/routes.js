var controller = require('./controllers');
var router = require('express').Router();

router.get('/products', controller.getProducts);
router.get('/products/:product_id', controller.getInfo);
router.get('/products/:product_id/styles', controller.getStyles);
router.get('/products/:product_id/related', controller.getRelated);

module.exports = router;