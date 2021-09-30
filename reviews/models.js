var db = require('./db_index.js');

const getAllReviews = (callback) => {
  var q = "SELECT * FROM reviews LIMIT 10";
  db.query(q, function(error, results) {
    if (error) console.log('GetAll ERROR', error);
    console.log('RESULTS', results)
    callback(error, results);
  });
};

const getMetaReview = (callback) => {
  // singleID
  var q = "SELECT COUNT(*) AS count FROM reviews";
  db.query(q, function(error, results) {
    callback(error, results);
  });
}


const postReview = (params, callback) => {

  // var q = "INSERT INTO reviews";


};

const updateHelpful = (params, callback) => {

  // var q = 

};

const updateReported = (params, callback) => {

  // var q = 

};


module.exports.getAllReviews = getAllReviews;
module.exports.getMetaReview = getMetaReview;
module.exports.postReview = postReview;
module.exports.updateHelpful = updateHelpful;
module.exports.updateReported = updateReported;

