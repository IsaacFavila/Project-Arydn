const express = require('express');
const app = express();
const mysql = require('mysql');
var db = require('./reviews/db_index.js');

const port = process.env.PORT || 3000;

const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

const {reviewsRouter} = require('./reviews/routes.js');
app.use('/', reviewsRouter);
const productRouter = require('./products/routes.js');
app.use('/db', productRouter);

const qaRouter = require('./questions-answers/routes.js');
app.use('/qa', qaRouter);

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

module.exports = app;