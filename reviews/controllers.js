
var models = require('./models.js');

exports.getAllReviews = (req, res) => {
	models.getAllReviews(req.query.count, req.query.page, (error, results) => {
		if (error) res.send(500).send(error);
	
		res.status(200).json(results)
	}) 
};

exports.getMetaReview = (req, res) => {
	models.getMetaReview(req.query.id, (error, results) => {
		if (error) res.send(500).send(error);
		res.status(200).json(results)
	})
};

exports.postReview = (req, res) => {
	models.postReview(req.body, function(error, results) {
		if (error) console.log('POST ERROR', error);
			res.sendStatus(201);
	})
};

exports.updateHelpful = (req, res) => {
	models.updateHelpful(req.body, function(error, results) {
		if (error) console.log('POST ERROR', error);
			res.sendStatus(204);
	})
};

exports.updateReported = (req, res) => {
	models.updateReported(req.body, function(error, results) {
		if (error) console.log('POST ERROR', error);
			res.sendStatus(204);
	})
};
