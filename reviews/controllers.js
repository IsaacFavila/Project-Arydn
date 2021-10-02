
var models = require('./models.js');

async function getAllReviews(req, res, next) {
  try {
		// console.log('REQ', req)
    res.json(await models.getAllReviews(req.query.page));
  } catch (error) {
    console.error(`Error while getting allReviews `, error.message);
    next(error);
  }
};

async function getMetaReview(req, res, next) {
	try {
		console.log('REQ', req)
    res.json(await models.getMetaReview(5));
  } catch (error) {
    console.error(`Error while getting allReviews `, error.message);
    next(error);
  }




	// console.log('REQ', req.url)
	// models.getMetaReview(req.query.id, (error, results) => {
	// 	if (error) res.send(500).send(error);
	// 	res.status(200).json(results)
	// })
};

async function postReview(req, res) {
	models.postReview(req.body, function(error, results) {
		if (error) console.log('POST ERROR', error);
			res.sendStatus(201);
			res.redirect('/');
	})
};

async function updateHelpful(req, res) {
	models.updateHelpful(req.body, function(error, results) {
		if (error) console.log('POST ERROR', error);
			res.sendStatus(204);
	})
};

async function updateReported(req, res) {
	models.updateReported(req.body, function(error, results) {
		if (error) console.log('POST ERROR', error);
			res.sendStatus(204);
	})
};

module.exports = {
  getAllReviews,
	getMetaReview,
	postReview,
	updateHelpful,
	updateReported
};