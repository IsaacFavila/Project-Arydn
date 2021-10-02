const express = require('express');
const app = express();
const morgan = require('morgan');


app.use(express.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(morgan('dev'));

const reviewsRouter = require('./reviews/routes.js');
app.use('/', reviewsRouter);
  
const productRouter = require('./products/routes.js');
// app.use('/db', productRouter);

const qaRouter = require('./questions-answers/routes.js');
// app.use('/qa', qaRouter);

app.get('/helloworld', function (req, res) {
  res.send('Hello World')
})


module.exports = app;