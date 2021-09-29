const app = require('../index.js');
const db = require('./index.js');

exports.getQuestions = ({product_id, page, count}) => {
  page = page || 1;
  var queryString = 'SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported FROM questions WHERE product_id = $1 LIMIT $2 OFFSET $3';
  var queryParams = [product_id, count, page];
  return db.query(queryString, queryParams);
  // db.query(queryString, queryParams, (err, res) => {
  //   if (err) {
  //     callback(err);
  //   } else {
  //     callback(null, res);
  //   }
  // })
};

exports.getAnswers = (question_id) => {
  var queryString = 'SELECT id, body, date, answerer_name, helpfulness FROM answers WHERE question_id = $1';
  var queryParams = [question_id];
  return db.query(queryString, queryParams);
  // db.query(queryString, queryParams, (err, res) => {
  //   if (err) {
  //     callback(err);
  //   } else {
  //     callback(null, res);
  //   }
  // })
};

exports.addQuestion = () => {

};

exports.addAnswer = () => {

};

exports.markQuestionHelpful = () => {

};

exports.markAnswerHelpful = () => {

};

exports.reportQuestion = () => {

};

exports.reportAnswer = () => {

};