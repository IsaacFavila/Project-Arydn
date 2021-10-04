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