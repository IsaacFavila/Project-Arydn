let db = require('./services/db');
let helper = require('./helper');
let config = require('./config');

const getAllReviews = async (id, page=1, count=5) => {
  let q = `SELECT review_id, rating, summary, recommend, response, body, FROM_UNIXTIME(review_date/1000) as date, reviewer_name, helpfulness 
          FROM reviews 
          WHERE product_id=${id}
          ORDER BY Helpfulness DESC
          LIMIT ${page-1}, ${count}`;
  let params = [id, page, count];
  return db.query(q, params );
};

const getPhotos = async (id) => {
  let q = `SELECT reviews_photos.id, reviews_photos.review_id, reviews_photos.photos_url
          FROM reviews_photos
          INNER JOIN reviews
            ON reviews_photos.review_id = reviews.review_id
          WHERE reviews.review_id=${id}`;
  let params = [id];
  return db.query(q, params );
};

const getMetaReview = async (id) => {
  let q = `SELECT reviews.product_id, reviews.rating as ratings, reviews.recommend as recommended, characteristics.char_name, characteristic_reviews.characteristic_id as id, characteristic_reviews.char_value as value
          FROM characteristic_reviews 
          INNER JOIN characteristics
            ON characteristics.id = characteristic_reviews.characteristic_id 
          INNER JOIN reviews
            ON reviews.review_id = characteristic_reviews.review_id 
          WHERE reviews.product_id=${id}
          ORDER BY rating, characteristic_reviews.characteristic_id`;
  let params = [id]
  return db.query(q, params );
};

const getMetaRatings = async (id) => {
  let q = `SELECT reviews.product_id, characteristics.char_name, characteristic_reviews.characteristic_id as id, AVG(characteristic_reviews.char_value) as value
          FROM characteristic_reviews 
          INNER JOIN characteristics
            ON characteristics.id = characteristic_reviews.characteristic_id 
          INNER JOIN reviews
            ON reviews.review_id = characteristic_reviews.review_id 
          WHERE reviews.product_id=${id}
          GROUP BY characteristics.char_name`;
  let params = [id]
  return db.query(q, params );
};

const postReview = async ({product_id, rating, summary, body, recommend, reviewer_name, reviewer_email}) => {
  let q = `INSERT INTO reviews(product_id, rating, summary, body, recommend, reviewer_name, reviewer_email) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`;
  let params = [product_id, rating, summary, body, recommend, reviewer_name, reviewer_email];

  return db.query(q, params );
};

const updateHelpful = async (id, reviews) => {
  let q = `UPDATE reviews 
          SET helpfulness = ? + 1 
          WHERE review_id=?`; 
  let result = await db.query(q, [reviews.helpfulness, id]); 
  
  let  message;
  if (result.affectedRows) {
    message = 'Successfully updated Helpfulness';
  }
  return {message};
};

const updateReported = async (id, reviews) => {
  let q = `UPDATE reviews 
          SET reported = ? + 1 
          WHERE review_id=?`; 
  let result = await db.query(q, [reviews.reported, id]); 
  
  let  message;
  if (result.affectedRows) {
    message = 'Successfully updated Reported';
  }
  return {message};
};

module.exports = {
  getAllReviews,
  getPhotos,
	getMetaReview,
  getMetaRatings,
	postReview,
	updateHelpful,
	updateReported
};