var models = require('./models.js');

const get = (req, res) => {
    console.log('REQ QUERY', req.query)
    models.getAllReviews(req.body.count, req.body.page, function(error, reviews) {
        console.log('REQ QUERY2', req.body)
        if (error) console.log('GET ERROR', error);
        // console.log('RESULTS', reviews)
        res.json(reviews);
    }) 
};

const getMetaReview = (req, res) => {
    models.getMetaReview(5, function(error, metaReviews) {
        console.log('REQ BODY', req)
        if (error) console.log('GET ERROR', error);
        res.json(metaReviews);
    })
};

const postReview = (req, res) => {
    var params = [];
    models.postReview(req.body, function(error, results) {
        if (error) console.log('POST ERROR', error);
        res.sendStatus(201);
    })
};

const putHelpful = (req, res) => {




};



const putReported = (req, res) => {



};

module.exports.get = get;
module.exports.getMetaReview = getMetaReview;
module.exports.postReview = postReview;
module.exports.putHelpful = putHelpful;
module.exports.putReported = putReported;