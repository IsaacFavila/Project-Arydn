const models = require('./models');

const getStyles = (req, res) => {
  var id = Number(req.params.product_id);
  models.getStyles(id, (err, styles) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(styles);
    }
  })
}


module.exports = {getStyles}