const pool = require('./db');

const getStyles = (id, callback) => {
  var queryStr = `select s.id as style_id, s.name, s.sale_price, s.original_price, s.default_style as default,
  json_build_array(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)) as photos,
  json_build_object('37', json_build_object('size', sk.size, 'quantity', sk.quantity)) as skus
  from styles s, photos p, skus sk
  where s.productId = ${id} and p.styleId = s.id and sk.styleId = s.id`;
  var obj = {
    product_id: id,
    results: []
  }

  pool.query(queryStr, (err, results)  => {
    var arr = [];

    for (var i = 0; i < results.rows.length; i++) {
      // add unique styles
      var current = results.rows[i];
      if(!arr.includes(current.style_id)) {
        obj.results.push(current);
        arr.push(current.style_id);
      }
      // add photos and skus to matching style
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
            // Conditional for error in data.
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
    callback(err, obj);
  });
}

module.exports = {getStyles}

