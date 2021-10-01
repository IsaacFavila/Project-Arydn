const axios = require('axios');

axios.get('http://localhost:3000/db/products')
  .then((response) => {
    console.log(response.data);
  })
  .catch ((err) => {
    console.log(err);
  })