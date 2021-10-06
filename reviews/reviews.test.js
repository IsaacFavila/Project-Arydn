const request = require('supertest');
const app = require('../index.js');
const axios = require('axios');

describe("GET for specific productID, /reviews?product_id=", () => {

  describe("given a productID", () => {
    // should retrieve reviews for product
    // should respond with a json object containing productID, page, count, results
      // results should be an array of objects containing review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, and photos array
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/reviews?product_id=2").send();
      expect(response.statusCode).toBe(200);
      
      axios.get("/reviews?product_id=2")
      .then((response) => {
        expect(response.data.length).toBe(5);
        expect(response.data[0].reviewer_name).toMatch('bigbrotherbenjamin');
      })
      .catch(() => {})
    })
  })

  describe("given invalid productID", () => {
    test("should respond with a status code of 400 and error message", async () => {
      const response = await request(app).get("/reviews?product_id=B12").send();
      expect(response.statusCode).toBe(400)
    })
  })

  describe("GET meta data for productID", () => {

    test("should respond with a 200 status code", async () => {
      axios.get("/reviews/meta?product_id=2")
      .then((response) => {
        expect(response.data.length).toBe(1)
        expect(response.data.product_id).toBe(2)
      })
      .catch(() => {})
  
    })    
  })

}) 


describe("POST review for productID", () => {

  test("should respond with a statusCode of 201", async () => {
    const response = await request(app).post("/reviews?:product_id=2").send({
      "product_id" : 2,
      "rating" : 5,
      "summary" : "Wow, check out this test!",
      "body" : "This is a test",
      "recommend" : "false",
      "reviewer_name" : "Testing1",
      "reviewer_email" : "Testing@aol.com"
    })
    expect(response.statusCode).toBe(201);
  })
    
})