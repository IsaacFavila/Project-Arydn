const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const app = express();

app.use(express.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(morgan('dev'));

const productRouter = require('./products/routes.js');
app.use('/db', productRouter);


// this is my loader.io authentication (charles)
app.get('/', function (req, res) {
  res.send('');
})



module.exports = app;
