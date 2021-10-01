const axios = require('axios');

describe("USE /db", () => {
  describe("get list of products", () => {
    test("should respond with data and status code 200", async () => {
      axios.get('/db/products')
        .then((response) => {
          expect(response.data).toBeDefined();
          expect(response.StatusCode).toBe(200);
        })
        .catch((err) => {
        })
    })
  })
  describe("get product information", () => {
    test("should respond with data and status code 200", async () => {
      axios.get('/db/products/:product_id')
        .then((response) => {
          expect(response.data).toBeDefined();
          expect(response.StatusCode).toBe(200);
        })
        .catch((err) => {
        })
    })
  })
  describe("get product styles", () => {
    test("should respond with data and status code 200", async () => {
      axios.get('/db/products/:product_id/styles')
        .then((response) => {
          expect(response.data).toBeDefined();
          expect(response.StatusCode).toBe(200);
        })
        .catch((err) => {
        })
    })
  })
  describe("get related products", () => {
    test("should respond with data and status code 200", async () => {
      axios.get('/db/products/:product_id/related')
        .then((response) => {
          expect(response.data).toBeDefined();
          expect(response.StatusCode).toBe(200);
        })
        .catch((err) => {
        })
    })
  })
})
