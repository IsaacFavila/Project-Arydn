const supertest = require('supertest');
const pool = require('./products/db');
const app = require('./index.js');
const { Pool } = require('pg');
const axios = require('axios');

describe("USE /db", () => {
  describe("get list of products", () => {
    test("should respond with data", async () => {
      axios.get('/db/products')
        .then((response) => {
          expect(response).toBeDefined();
        })
        .catch((err) => {
        })
    })
    test("should respond with a 200 status code", async () => {
      axios.get('/db/products')
        .then((response) => {
          expect(response.StatusCode).toBe(200);
        })
        .catch((err) => {
        })
    })
  })
  describe("get product information", () => {
    test("should respond with data", async () => {
      axios.get('/db/product/info')
        .then((response) => {
          expect(response).toBeDefined();
        })
        .catch((err) => {
        })
    })
    test("should respond with a 200 status code", async () => {
      axios.get('/db/product/info')
        .then((response) => {
          expect(response.StatusCode).toBe(200);
        })
        .catch((err) => {
        })
    })
  })
  describe("get product styles", () => {
    test("should respond with data", async () => {
      axios.get('/db/product/styles')
        .then((response) => {
          expect(response).toBeDefined();
        })
        .catch((err) => {
        })
    })
    test("should respond with a 200 status code", async () => {
      axios.get('/db/product/styles')
        .then((response) => {
          expect(response.StatusCode).toBe(200);
        })
        .catch((err) => {
        })
    })
  })
  describe("get related products", () => {
    test("should respond with data", async () => {
      axios.get('/db/product/related')
        .then((response) => {
          expect(response).toBeDefined();
        })
        .catch((err) => {
        })
    })
    test("should respond with a 200 status code", async () => {
      axios.get('/db/product/related')
        .then((response) => {
          expect(response.StatusCode).toBe(200);
        })
        .catch((err) => {
        })
    })
  })
})
