const axios = require('axios');

describe("USE /db", () => {
  describe("get list of products", () => {
    test("should respond with 5 products from page 1 at default", async () => {
      axios.get('/db/products')
        .then((response) => {
          expect(response.data[0].id).toBe(1);
          expect(response.data[response.data.length -1].id).toBe(5);
          expect(response.data.length).toBe(5);
        })
        .catch((err) => {
        })
    })
    test("should respond with correct count from defined page", async () => {
      axios.get('/db/products?page=2&count=1')
        .then((response) => {
          expect(response.data[0].id).toBe(2);
          expect(response.data.length).toBe(1);
        })
        .catch((err) => {
        })
    })
    test("should respond with status code 200", async () => {
      axios.get('/db/products')
        .then((response) => {
          expect(response.StatusCode).toBe(200);
        })
        .catch((err) => {
        })
    })
  })
  describe("get product information", () => {
    test("should respond with correct product information", async () => {
      axios.get('/db/products/1')
        .then((response) => {
          expect(response.data.id).toBe(1);
          expect(response.data.default_price).toBe(140);
          expect(response.data.name).toMatch('Camo Onesie');
        })
        .catch((err) => {
        })
    })
    test("should respond with data and status code 200", async () => {
      axios.get('/db/products/1')
        .then((response) => {
          expect(response.StatusCode).toBe(200);
        })
        .catch((err) => {
        })
    })
  })
  describe("get product styles", () => {
    test("should respond with correct product styles", async () => {
      axios.get('/db/products/1/styles')
        .then((response) => {
          expect(response.data.results.length).toBe(6);
          expect(response.data.results[0].name).toMatch('Forest Green & Black');
          expect(response.data.results[1].name).toMatch('Desert Brown & Tan');
        })
        .catch((err) => {
        })
    })
    test("should respond with status code 200", async () => {
      axios.get('/db/products/1/styles')
        .then((response) => {
          expect(response.StatusCode).toBe(200);
        })
        .catch((err) => {
        })
    })
  })
  describe("get related products", () => {
    test("should respond with correct related products", async () => {
      axios.get('/db/products/1/related')
        .then((response) => {
          const expected = [2, 3, 8, 7];
          expect(response.data).toEqual(expect.arrayContaining(expected));
        })
        .catch((err) => {
        })
    })
    test("should respond with status code 200", async () => {
      axios.get('/db/products/1/related')
        .then((response) => {
          expect(response.StatusCode).toBe(200);
        })
        .catch((err) => {
        })
    })
  })
})
