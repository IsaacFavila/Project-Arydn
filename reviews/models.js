const db = require('./services/db');
const helper = require('./helper');
const config = require('./config');

async function getAllReviews(page=1) {
  const offset = helper.getOffset(id, config.listPerPage);
  const q = `SELECT review_id, rating, summary, recommend, response, body, FROM_UNIXTIME(review_date/1000) as date, reviewer_name, helpfulness 
            FROM reviews 
            ORDER BY Helpfulness DESC
            LIMIT ?, ?`;
  const rows = await db.query(q, [offset, config.listPerPage] );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {data, meta}
}

async function getMetaReview (id, page=1){
  const offset = helper.getOffset(id, config.listPerPage);
  const q = `SELECT reviews.product_id, reviews.rating as ratings, reviews.recommend as recommended, characteristics.char_name, characteristic_reviews.characteristic_id as id, characteristic_reviews.char_value as value
            FROM characteristic_reviews 
            INNER JOIN characteristics
              ON characteristics.id = characteristic_reviews.characteristic_id 
            INNER JOIN reviews
              ON reviews.review_id = characteristic_reviews.review_id 
            WHERE reviews.product_id=${id}
            ORDER BY rating, characteristic_reviews.characteristic_id`
  const rows = await db.query(q, [offset, config.listPerPage] );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {data, meta}
}
  // const data = helper.emptyOrRows(rows);
  // const meta = {id};

  // return {
  //   data,
  //   meta
  // }
  // var q = `SELECT reviews.product_id, reviews.rating as ratings, reviews.recommend as recommended, characteristics.char_name, characteristic_reviews.characteristic_id as id, characteristic_reviews.char_value as value
  //         FROM characteristic_reviews 
  //         INNER JOIN characteristics
  //           ON characteristics.id = characteristic_reviews.characteristic_id 
  //         INNER JOIN reviews
  //           ON reviews.review_id = characteristic_reviews.review_id 
  //         WHERE reviews.product_id=30
  //         ORDER BY rating, characteristic_reviews.characteristic_id`;
                    
  // connection.query(q, function(error, results) {
  //   if (error) console.log('getMetaCharacteristics Error', error);
  //     console.log('getMeta Result >>>>>>>', results[0])
  //     callback(error, results);
  //  });
// };

async function getMetaRatings (id) {
  var q = `SELECT rating, COUNT(*) 
          FROM reviews 
          WHERE product_id=30 
          GROUP BY rating`;
                  
  connection.query(q, function(error, results) {
    if (error) console.log('getMetaRatings Error', error);
      console.log('getMeta Result >>>>>>>', results[0])
      callback(error, results);
  });
};

async function postReview (q) {
  var data = [
    //  [10, 4, 'Wow', 'SUPER DUPER', 'true', 'Bill', 'Billy@aol.com'],
    ];

  var q = "INSERT INTO reviews(product_id, rating, summary, body, recommend, reviewer_name, reviewer_email) VALUES ?";
  connection.query(q, [data], function(error, results) {
    if (error) console.log('postReview Error', error);
    console.log('Post Result >>>>>', results)
    callback(error, results);
  });
};

async function updateHelpful (id) {

  var q = `UPDATE reviews 
          SET helpfulness = helpfulness + 1 
          WHERE review_id=${id}`;

  connection.query(q, function(error, results) {
    if (error) console.log('updateHelpfulness ERROR', error);
    // console.log('RESULTS', results)
    callback(error, results);
  });
};

async function updateReported (id) {

  var q = `UPDATE reviews 
          SET reported = helpfulness + 1 
          WHERE review_id=${id}`;

  connection.query(q, function(error, results) {
    if (error) console.log('getMeta ERROR', error);
    // console.log('RESULTS', results)
    callback(error, results);
  });
};

module.exports = {
  getAllReviews,
	getMetaReview,
	postReview,
	updateHelpful,
	updateReported
};