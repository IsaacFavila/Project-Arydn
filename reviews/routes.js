var controller = require('./controllers.js');
var express = require('express');
var router = express.Router();

router.get('/reviews', controller.getAllReviews);
router.get('/reviews/meta', controller.getMetaReview);
router.post('/reviews', controller.postReview);
router.put('/reviews/:review_id/helpful', controller.updateHelpful);
router.put('/reviews/:review_id/report', controller.updateReported);

module.exports = router; 