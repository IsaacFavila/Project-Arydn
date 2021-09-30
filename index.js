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

app.get('/helloworld', function (req, res) {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`listening at http://localhost${port}`)
})

