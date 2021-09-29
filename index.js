const express = require('express');
const app = express();
const mysql = require('mysql');

const port = process.env.PORT || 3000;

const morgan = require('morgan');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'reviewsdb'
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

const products = require('./products/db.js');
const productRouter = require('./products/routes.js');
app.use('/db', productRouter);

app.get('/helloworld', function (req, res) {
  res.send('Hello World')
})

app.get('/reviews', function (req, res) {
  res.send('My Reviews')
})

app.get('/reviews/meta', function (req, res) {
  res.send('Meta')
})


app.listen(port, () => {
  console.log(`listening at http://localhost${port}`)
})

