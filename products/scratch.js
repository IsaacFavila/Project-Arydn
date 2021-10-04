  // var queryStr = `select * from styles s, photos p, skus sk where s.productId = ${id} and p.styleid = s.id and sk.styleid = s.id`;
  // pool.query(queryStr, (err, results)  => {
  //   var helperObj = {
  //     product_id: id,
  //     results: []
  //   };
  //   var helperArr = [];
  //   var urlArr = [];

  // // Format and add all unique styles to helperObj.results
  //   for (var i = 0; i < results.rows.length; i++) {
  //     var currentObj = results.rows[i];
  //     if (!helperArr.includes(currentObj.styleid)) {
  //       helperArr.push(currentObj.styleid);
  //       // Format
  //       delete currentObj.id;
  //       delete currentObj.productid;
  //       currentObj.style_id = currentObj.styleid;
  //       delete currentObj.styleid;
  //       if (currentObj.sale_price === 'null') {
  //         currentObj.sale_price = 0;
  //       }
  //       currentObj['default?'] = currentObj.default_style;
  //       delete currentObj.default_style;
  //       // Add photos and skus
  //       currentObj.photos = [];
  //       urlArr.push(currentObj.thumbnail_url);
  //       var firstPhoto = {
  //         thumbnail_url: currentObj.thumbnail_url,
  //         url: currentObj.url
  //       }
  //       currentObj.photos.push(firstPhoto);
  //       delete currentObj.thumbnail_url;
  //       delete currentObj.url;
  //       currentObj.skus = {};
  //       currentObj.skus[0] = {
  //         quantity: currentObj.quantity,
  //         size: currentObj.size
  //       };
  //       delete currentObj.quantity;
  //       delete currentObj.size;
  //       // Push formatted object
  //       helperObj.results.push(currentObj);
  //     }
  //   }

  // // Add all photos to corresponding style id
  //   for (var i = 0; i < helperObj.results.length; i++) {
  //     var currentStyle = helperObj.results[i];
  //     for (var j = 0; j < results.rows.length; j++) {
  //       var currentObj = results.rows[j];
  //       if (currentStyle.style_id === currentObj.styleid) {
  //         if (!urlArr.includes(currentObj.thumbnail_url)) {
  //           urlArr.push(currentObj.thumbnail_url);

  //           var newPhoto = {
  //             thumbnail_url: currentObj.thumbnail_url,
  //             url: currentObj.url
  //           }
  //           currentStyle.photos.push(newPhoto);
  //         }
  //       }
  //     }
  //   }

  // // Add all skus to corresponding style id
  //   for (var i = 0; i < helperObj.results.length; i++) {
  //     var currentStyle = helperObj.results[i];
  //     for (var j = 0; j < results.rows.length; j++) {
  //       var currentObj = results.rows[j];
  //       if (currentStyle.style_id === currentObj.styleid) {

          // if (currentObj.styleid === 1 && currentObj.quantity === 4 & currentObj.size === 'XL') {
          //   // Conditional for error in data.
          //   currentObj.size = 'XXL';
          // };

  //         var newSku = {
  //           quantity: currentObj.quantity,
  //           size: currentObj.size
  //         };

  //         var lastSkuKey = Number(Object.keys(currentStyle.skus)[Object.keys(currentStyle.skus).length - 1]);

  //         if (newSku.size !== currentStyle.skus[lastSkuKey].size) {
  //           var newSkuId = lastSkuKey + 1;
  //           currentStyle.skus[newSkuId] = newSku;
  //         }

  //       }
  //     }
  //   }
  //   callback(err, helperObj);
  // });




  // json_build_array(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)),
  // json_build_object('sk.id', json_build_object('size', sk.size, 'quantity', sk.quantity))
  // from styles s, photos p, skus sk
  // where s.productId = ${id} and p.styleid = s.id and sk.styleid = s.id`;





const axios = require('axios');
//node products/scratch.js to run

// axios.get('http://localhost:3000/db/products?page=1&count=1')
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch ((err) => {
//     console.log(err);
//   })
// axios.get('http://localhost:3000/db/products/1')
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch ((err) => {
//     console.log(err);
//   })
// axios.get('http://localhost:3000/db/products/1/styles')
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch ((err) => {
//     console.log(err);
//   })
// axios.get('http://localhost:3000/db/products/1/related')
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch ((err) => {
//     console.log(err);
//   })



// const getInfo = (id, callback) => {
  //json build arr - feature, value
  // group by - products id
  // var queryStr = `select products.*,
  // json_build_array(json_build_object('feature', features.feature, 'value', features.value))
  // from products
  // left join features
  // on products.id = features.product_id
  // where products.id = ${id}`;
  // pool.query(queryStr, (err, results)  => {
  //   console.log(results.rows);
  //   callback(err, results.rows);
  // });
// }

// const getStylesNew = (id, callback) => {
  //   var queryStr = `select styles.*,
  //   json_build_array(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url))
  //   from styles
  //   left join photos
  //   on styles.id = photos.styleId
  //   where styles.productId = ${id} limit 2`;
  //   pool.query(queryStr, (err, results) => {
  //     var helperObj = {
  //       product_id: id,
  //       results: results.rows
  //     }
  //     callback(err, helperObj);
  //   })
// }


// for (var i = 0; i < results.rows.length; i++) {
//   var current = results.rows[i];
//   for (var j = 0; j < obj.results.length; j++) {
//     var style = obj.results[j];
//     if (current.style_id === style.style_id) {

//       if (current.style_id === 1 && current.skus[37].quantity === 4 & current.skus[37].size === 'XL') {
//         // Conditional for error in data.
//         current.skus[37].size = 'XXL';
//       };

//       var lastSkuKey = Number(Object.keys(style.skus)[Object.keys(style.skus).length - 1]);
//       if(current.skus[37].size !== style.skus[lastSkuKey].size) {
//         style.skus[lastSkuKey + 1] = current.skus[37];
//       }
//     }
//   }
// }
