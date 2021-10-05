var controller = require('./controllers.js');
var express = require('express');
var router = express.Router();

router.get('/reviews?:product_id', controller.getAllReviews);
router.get('/reviews/meta?:product_id', controller.getMetaReview);
router.post('/reviews?:product_id', controller.postReview);
router.put('/reviews/:review_id/helpful', controller.updateHelpful);
router.put('/reviews/:review_id/report', controller.updateReported);

module.exports = router;  