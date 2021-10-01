var models = require('./models.js');

const get = (req, res) => {
    models.getAllReviews(req.body.count, req.body.page, function(error, reviews) {
        console.log('REQ QUERY', req.body)
        if (error) console.log('GET ERROR', error);
        // console.log('RESULTS', reviews)
        res.json(reviews);
    }) 
};

const getMetaReview = (req, res) => {
    models.getMetaReview(100, function(error, metaReviews) {
        console.log('REQ BODY', req)
        if (error) console.log('GET ERROR', error);
        res.json(metaReviews);
    })
};

const postReview = (req, res) => {
    // var params = [];
    // models.postReview(params, function(error, results) {
    //     if (error) console.log('POST ERROR', error);
    //     res.sendStatus(201);
    // })
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