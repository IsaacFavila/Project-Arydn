var controller = require('./controllers.js');
var express = require('express');
var reviewsRouter = express.Router();

reviewsRouter.get('/reviews', controller.get);
// router.get('/reviews', controller.getMeta);
// router.post('/reviews/meta', controller.post);
// router.put('/reviews/:review_id/helpful', controller.putHelpful);
// router.put('/reviews/:review_id/report', controller.putReported);

module.exports.reviewsRouter = reviewsRouter; 