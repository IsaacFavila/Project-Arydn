var controller = require('./controllers.js');
var router = require('express').Router();

router.get('/products', controller.getProducts);
router.get('/product/info', controller.getInfo);
router.get('/product/styles', controller.getStyles);
router.get('/product/related', controller.getRelated);

module.exports = router;