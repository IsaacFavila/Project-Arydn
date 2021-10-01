var db = require('./db_index.js');

const getAllReviews = (count=5, page=1, callback) => {
  var q = `SELECT * FROM reviews LIMIT ${page-1}, ${count}`;
  db.query(q, function(error, results) {
    if (error) console.log('GetAll ERROR', error);
    // console.log('RESULTS', results)
    callback(error, results);
  });
};

const getMetaReview = (id, callback) => {
  var q = `SELECT * FROM reviews WHERE product_id=${id}`;
  db.query(q, function(error, results) {
    if (error) console.log('getMeta ERROR', error);
    // console.log('RESULTS', results)
    callback(error, results);
  });
}


const postReview = (params, callback) => {

  var q = "INSERT INTO reviews SET ";


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

