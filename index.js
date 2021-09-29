const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const morgan = require('morgan');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/helloworld', function (req, res) {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})