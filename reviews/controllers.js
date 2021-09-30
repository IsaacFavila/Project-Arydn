var models = require('./models.js');

const get = (req, res) => {
    models.getAllReviews(function(error, results) {
        if (error) console.log('GET ERROR', error);
        // console.log('RESULTS', results)
        res.json(results);
    }) 
};

const getMetaReview = (req, res) => {
    // models.getMetaReview(function(error, results) {
    //     if (error) console.log('GET ERROR', error);
    //     res.json(results);
    // })
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