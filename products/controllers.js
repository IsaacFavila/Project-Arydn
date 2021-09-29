var models = require('./models.js');

const getProducts = (req, res) => {

}

const getInfo = (req, res) => {
  res.send('Product info');
  // console.log(req.body.id);
  // models.getInfo(req.body.id, (err, info) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   } else {
  //     res.status(200).json(info);
  //   }
  // })
}

const getStyles = (req, res) => {
  res.send('Product styles');
}
const getRelated = (req, res) => {
  res.send('Related products');
}

module.exports = {
  getProducts,
  getInfo,
  getStyles,
  getRelated
}