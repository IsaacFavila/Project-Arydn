
var models = require('./models.js');

const getAllReviews = async (req, res) => {
	
  let product_id = req.query.product_id;
  let photosArr = [];
  let results = [];
  let result = {};
  // console.log('pID', product_id)
  
  models.getAllReviews(product_id)
  .then(data => {
    // result.push(data)
    // console.log('Data', data)
    for (let i=0; i<data.length; i++) {
      let currentReview = data[i];
      console.log('Current', currentReview)
      // models.getPhotos(currentReview.review_id)
      // .then(data => {
      //   Promise.all(results)
      //   .then(photo => {
          
      //     console.log('data', data)
        results.push({
          "review_id" : data[i].review_id,
          "rating" : data[i].rating,
          "summary" : data[i].summary,
          "recommend" : data[i].recommend,
          "response" : data[i].response,
          "body" : data[i].body,
          "date" : data[i].date,
          "reviewer_name" : data[i].reviewer_name,
          "helpfulness" : data[i].helpfulness,
          "photos" : []
        // })
      // })
      })
		}
    // console.log('Results', results)
		res.send(results)
	})
  .catch((error) =>  {
    console.log('Error ')
    res.sendStatus(400);
  })  
};

const getMetaReview = async (req, res) => {
	// console.log('Query' , req.query.product_id)
  let product_id = req.query.product_id;
  let ratings = {
    "1" : 0,
    "2" : 0,
    "3" : 0,
    "4" : 0,
    "5" : 0
  };
  let recommended = {
    "0" : 0,
    "1" : 0
  };
  let characteristics = {
    "Size":{},
    "Width":{},
    "Comfort":{},
    "Quality":{}
  };
  await models.getMetaReview(product_id)
  .then(data => {
    // console.log('DATA: ', data)
    data.map((review) => {
      // console.log('Reviews: ', review)
      ratings[review.ratings] ++;
      review.recommended === 'true' ? recommended["1"] +=1 : recommended["0"] +=1
    })
  })
  await models.getMetaRatings(product_id)
  .then(data => {
    for (let j = 0; j < data.length; j++) {
      let currentName = data[j].char_name;
      characteristics[currentName] = {
        "id" : data[j].id,
        "value" : data[j].value.toPrecision(5)
      }
    }
  })
    let result = {
      "product_id" : product_id,
      "ratings" : ratings,
      "recommended" : recommended,
      "characteristics" : characteristics
    }
    res.send(result);
};

const postReview = async (req, res) => {
  let product_id = req.query.product_id;
	// console.log('pID', product_id);

	await models.postReview(req.body)
	res.sendStatus(201);
	console.log('Message sent')
};

const updateHelpful = async (req, res) => {
	await models.updateHelpful(req.body)
	.then(result => {
		res.sendStatus(204);
	}) 
	.catch(error => {
		console.log('Error', error)
	})
};

const updateReported = async (req, res) => {
	await models.updateReported(req.body)
	.then(result => {
		res.sendStatus(204);
	}) 
	.catch(error => {
		console.log('Error', error)
	})
};

module.exports = {
  getAllReviews,
	getMetaReview,
	postReview,
	updateHelpful,
	updateReported
};