const pool = require('./db.js');

const getProducts = (page=1, count=5, callback) => {
  var queryStr = `select * from products limit ${count} offset ${(page - 1) * count}`;
  pool.query(queryStr, (err, results) => {
    callback(err, results.rows);
  });
}

const getInfo = (id, callback) => {
  var queryStr = `select * from products p, features f where p.id = ${id} and f.product_id = ${id}`;
  pool.query(queryStr, (err, results)  => {
    // Data formatting
    var helperObj = results.rows[0];
    helperObj.features = [];
    // Push new feature to features
    for (var i = 0; i < results.rows.length; i++) {
      var newFeature = {
        feature: results.rows[i].feature,
        value: results.rows[i].value
      };
      helperObj.features.push(newFeature);
    }
    // More formatting to match API
    helperObj.id = helperObj.product_id;
    delete helperObj.product_id;
    delete helperObj.feature;
    delete helperObj.value;
    callback(err, helperObj);
  });
}

const getStyles = (id, callback) => {
  var queryStr = `select * from styles s, photos p, skus sk where s.productId = ${id} and p.styleid = s.id and sk.styleid = s.id`;
  //  and sku.styleID = s.id;
  pool.query(queryStr, (err, results)  => {
    var helperObj = {
      product_id: id,
      results: []
    };
    var helperArr = [];
    var urlArr = [];

  // Format and add all unique styles to helperObj.results
    for (var i = 0; i < results.rows.length; i++) {
      var currentObj = results.rows[i];
      if (!helperArr.includes(currentObj.styleid)) {
        helperArr.push(currentObj.styleid);
        // Format
        delete currentObj.id;
        delete currentObj.productid;
        currentObj.style_id = currentObj.styleid;
        delete currentObj.styleid;
        if (currentObj.sale_price === 'null') {
          currentObj.sale_price = 0;
        }
        currentObj['default?'] = currentObj.default_style;
        delete currentObj.default_style;
        // Add photos and skus
        currentObj.photos = [];
        urlArr.push(currentObj.thumbnail_url);
        var firstPhoto = {
          thumbnail_url: currentObj.thumbnail_url,
          url: currentObj.url
        }
        currentObj.photos.push(firstPhoto);
        delete currentObj.thumbnail_url;
        delete currentObj.url;
        currentObj.skus = {};
        currentObj.skus[0] = {
          quantity: currentObj.quantity,
          size: currentObj.size
        };
        delete currentObj.quantity;
        delete currentObj.size;
        // Push formatted object
        helperObj.results.push(currentObj);
      }
    }

  // Add all photos to corresponding style id
    for (var i = 0; i < helperObj.results.length; i++) {
      var currentStyle = helperObj.results[i];
      for (var j = 0; j < results.rows.length; j++) {
        var currentObj = results.rows[j];
        if (currentStyle.style_id === currentObj.styleid) {
          if (!urlArr.includes(currentObj.thumbnail_url)) {
            urlArr.push(currentObj.thumbnail_url);

            var newPhoto = {
              thumbnail_url: currentObj.thumbnail_url,
              url: currentObj.url
            }
            currentStyle.photos.push(newPhoto);
          }
        }
      }
    }

  // Add all skus to corresponding style id
    for (var i = 0; i < helperObj.results.length; i++) {
      var currentStyle = helperObj.results[i];
      for (var j = 0; j < results.rows.length; j++) {
        var currentObj = results.rows[j];
        if (currentStyle.style_id === currentObj.styleid) {

          if (currentObj.styleid === 1 && currentObj.quantity === 4 & currentObj.size === 'XL') {
            // Conditional for error in data.
            currentObj.size = 'XXL';
          };

          var newSku = {
            quantity: currentObj.quantity,
            size: currentObj.size
          };

          var lastSkuKey = Number(Object.keys(currentStyle.skus)[Object.keys(currentStyle.skus).length - 1]);

          if (newSku.size !== currentStyle.skus[lastSkuKey].size) {
            var newSkuId = lastSkuKey + 1;
            currentStyle.skus[newSkuId] = newSku;
          }

        }
      }
    }
    callback(err, helperObj);
  });
}

const getRelated = (id, callback) => {
  var queryStr = `select related_product_id from related where current_product_id = ${id}`;
  pool.query(queryStr, (err, results)  => {
    // Data formatting
    var helperArr =[];

    // Push each object value to helperArr
    for (var i = 0; i < results.rows.length; i++) {
      helperArr.push(results.rows[i].related_product_id);
    }
    callback(err, helperArr);
  });
}

module.exports = {
  getProducts,
  getInfo,
  getStyles,
  getRelated
}

