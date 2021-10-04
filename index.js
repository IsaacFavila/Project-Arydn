const express = require('express');
<<<<<<< HEAD
=======
const morgan = require('morgan');
const mysql = require('mysql');
>>>>>>> main
const app = express();
const morgan = require('morgan');


app.use(express.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(morgan('dev'));

<<<<<<< HEAD
const reviewsRouter = require('./reviews/routes.js');
app.use('/', reviewsRouter);
  
=======
// const {reviewsRouter} = require('./reviews/routes.js');
// app.use('/', reviewsRouter);

>>>>>>> main
const productRouter = require('./products/routes.js');
// app.use('/db', productRouter);

<<<<<<< HEAD
const qaRouter = require('./questions-answers/routes.js');
=======
// const qaRouter = require('./questions-answers/routes.js');
>>>>>>> main
// app.use('/qa', qaRouter);

app.get('/helloworld', function (req, res) {
  res.send('Hello world');
})


module.exports = app;