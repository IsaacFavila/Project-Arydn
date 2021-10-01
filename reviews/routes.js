var controller = require('./controllers.js');
var express = require('express');
var reviewsRouter = express.Router();

reviewsRouter.get('/reviews', controller.get);
reviewsRouter.get('/reviews/meta', controller.getMetaReview);
// reviewsRouter.post('/reviews/meta', controller.post);
// reviewsRouter.put('/reviews/:review_id/helpful', controller.putHelpful);
// reviewsRouter.put('/reviews/:review_id/report', controller.putReported);

module.exports.reviewsRouter = reviewsRouter; 