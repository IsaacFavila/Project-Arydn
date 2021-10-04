const pool = require('./db');

const getProducts = (req, res) => {
  var page = Number(req.query.page) || 1;
  var count = Number(req.query.count) || 5;
  pool.query(`select * from products limit ${count} offset ${(page - 1) * count}`)
    .then(({rows}) => {
      res.status(200).json(rows);
    })
    .catch(err => {
      res.status(500).send(err);
    })
}

const getInfo = (req, res) => {
  var id = Number(req.params.product_id);
  pool.query(`select * from products where id = ${id}`)
    .then(({rows}) => {
      var product = rows[0];
      pool.query(`select feature, value from features f where f.product_id = ${id}`)
        .then(({rows}) => {
          product.features = rows
          res.status(200).json(product);
        })
        .catch(err => {
          res.status(500).send(err);
        })
    })
    .catch(err => {
      res.status(500).send(err);
    })
}

const getStyles = (req, res) => {
  var id = Number(req.params.product_id);
  var queryStr = `select s.id as style_id, s.name, s.sale_price, s.original_price, s.default_style as default,
  json_build_array(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)) as photos,
  json_build_object('37', json_build_object('size', sk.size, 'quantity', sk.quantity)) as skus
  from styles s, photos p, skus sk
  where s.productId = ${id} and p.styleId = s.id and sk.styleId = s.id`;
  pool.query(queryStr)
  .then(({rows}) => {
      var obj = {
        product_id: id,
        results: []
      }
      var arr = [];
      for (var i = 0; i < rows.length; i++) {
        var current = rows[i];
        if(!arr.includes(current.style_id)) {
          obj.results.push(current);
          arr.push(current.style_id);
        }
        for (var j = 0; j < obj.results.length; j++) {
          var style = obj.results[j];
          if (!arr.includes(style.photos[0].url)) {
            var sizes = ['XS'];
            arr.push(style.photos[0].url);
          }
          if (current.style_id === style.style_id){
            if(!arr.includes(current.photos[0].url)) {
              style.photos.push(current.photos[0]);
              arr.push(current.photos[0].url);
            }
            if (current.style_id === 1 && current.skus[37].quantity === 4 & current.skus[37].size === 'XL') {
              current.skus[37].size = 'XXL';
            };
            if(!sizes.includes(current.skus[37].size)) {
              var lastSkuKey = Number(Object.keys(style.skus)[Object.keys(style.skus).length - 1]);
              style.skus[lastSkuKey + 1] = current.skus[37];
              sizes.push(current.skus[37].size);
            }
          }
        }
      }
      res.status(200).json(obj);
    })
    .catch(err => {
      res.status(500).send(err);
    })
}

const getRelated = (req, res) => {
  var id = Number(req.params.product_id);
  pool.query(`select json_agg(related_product_id) from related where current_product_id = ${id}`)
    .then(({rows}) => {
      res.status(200).json(rows[0].json_agg);
    })
    .catch(err => {
      res.status(500).send(err);
    })
}

module.exports = {
  getProducts,
  getInfo,
  getStyles,
  getRelated
}