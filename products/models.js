const pool = require('./db.js');

const getProducts = (page=1, count=5, callback) => {
  var queryStr = `select * from products limit ${count} offset ${(page - 1) * count}`;
  pool.query(queryStr, (err, results) => {
    console.log(results.rows);
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
    console.log(helperObj);
    callback(err, helperObj);
  });
}

const getStyles = (id, callback) => {
  var queryStr = `select * from styles s, photos p where s.productId = ${id} and p.styleID = s.id`;
  //  and sku.styleID = s.id;
  // add photos and skus
  pool.query(queryStr, (err, results)  => {
    var helperObj = {
      product_id: id,
      results: []
    };

    helperObj.results.push(results.rows[0]);
    console.log(helperObj.results);

    // for (var i = 0; i < results.rows.length; i++) {
    //   if (helperObj.results.length === 0) {
    //     helperObj.results.push(results.rows[i]);
    //   }
    //   for (var j = 0; j < helperObj.results.length; j++) {
    //     if (helperObj.results[j].styleid !== results.rows[i].styleid) {
    //       var newStyle = results.rows[i]
    //       helperObj.results.push(newStyle);
    //     }
    //   }
    // }
    // results.rows[0].photos = []
    // var photo = {
    //   thumbnail_url: results.rows[0].thumbnail_url,
    //   url: results.rows[0].url
    // };
    // results.rows[0].photos.push(photo);

    // results.rows[0]['default?'] = results.rows[0].default_style;
    // results.rows[0]['style_id'] = results.rows[0].styleid;
    // delete results.rows[0].thumbnail_url;
    // delete results.rows[0].url;

    // helperObj.results.push(results.rows[0]);



    callback(err, helperObj.results);
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
    console.log(helperArr);
    callback(err, helperArr);
  });
}

module.exports = {
  getProducts,
  getInfo,
  getStyles,
  getRelated
}

