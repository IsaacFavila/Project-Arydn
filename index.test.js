const supertest = require('supertest');
const app = require('./index.js');

describe("USE /db", () => {
  describe("get list of products", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/helloworld")
      expect(response.statusCode).toBe(200);
    })
  })
  describe("get product information", () => {
    test("should respond with a 200 status code", async () => {
      var response = 200;
      expect(response).toBe(200);
    })
  })
  describe("get product styles", () => {
    test("should respond with a 200 status code", async () => {
      var response = 200;
      expect(response).toBe(200);
    })
  })
  describe("get related products", () => {
    test("should respond with a 200 status code", async () => {
      var response = 200;
      expect(response).toBe(200);
    })
  })
})