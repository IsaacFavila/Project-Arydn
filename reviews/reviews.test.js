import supertest from 'supertest';

const axios = require('axios');



describe("GET for specific productID, /reviews?product_id=", () => {

  describe("given a productID", () => {
    // should retrieve reviews for product
    // should respond with a json object containing productID, page, count, results
      // results should be an array of objects containing review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, and photos array
    // should respond with a 200 status code



  })

  describe("given invalid productID", () => {
    // should respond with a status code of 400 and error message


  })

}) 



describe("GET meta data for productID", () => {




    
})