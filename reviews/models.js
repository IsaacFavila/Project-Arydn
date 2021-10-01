var db = require('./db_index.js');

const getAllReviews = (product_id, count=5, page=1, callback) => {
  var q = `SELECT review_id, rating, summary, recommend, response, body, review_date, reviewer_name, helpfulness FROM reviews LIMIT ${page-1}, ${count}`;
  db.query(q, function(error, results) {
    
    if (error) console.log('GetAll ERROR', error);
    console.log('RESULTS', results)
    // callback(error, results);
  });
};

const getMetaReview = (id, callback) => {
  /// PRODUCT ID
  // var q = `SELECT * FROM characteristics JOIN characteristic_reviews ON characteristics.id = characteristic_reviews.characteristic_id WHERE product_id=${id}`;
  db.query(q, function(error, results) {
    if (error) console.log('getMeta ERROR', error);
    // console.log('RESULTS', results)
    callback(error, results);
  });
}


const postReview = (q, callback) => {
  var q = "INSERT INTO reviews(product_id, rating, summary, body, recommend, reviewer_name, reviewer_email) VALUES ?";
  db.query(q, function(error, results) {
    if (error) console.log('getMeta ERROR', error);
    // console.log('RESULTS', results)
    callback(error, results);
  });

};

const updateHelpful = (query, callback) => {

  // var q = 

};

const updateReported = (query, callback) => {

  // var q = 

};


module.exports.getAllReviews = getAllReviews;
module.exports.getMetaReview = getMetaReview;
module.exports.postReview = postReview;
module.exports.updateHelpful = updateHelpful;
module.exports.updateReported = updateReported;

