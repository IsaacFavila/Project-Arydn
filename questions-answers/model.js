const app = require('../index.js');
const db = require('./index.js');

exports.getQuestions = ({product_id, page, count}) => {
  page = page || 1;
  var queryString = 'SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported FROM questions WHERE product_id = $1 AND reported = false ORDER BY questions.question_id LIMIT $2 OFFSET $3';
  var queryParams = [product_id, count, page - 1];
  return db.query(queryString, queryParams);
};

exports.getQuestionsTwo = ({product_id, page, count}) => {
  page = page || 1;
  var queryString = 'SELECT questions.question_id, questions.question_body, questions.question_date, questions.asker_name, questions.question_helpfulness, questions.reported,  answers.id, answers.body, answers.date, answers.answerer_name, answers.helpfulness,answerphotos.photo_id, answerphotos.url, answerphotos.answer_id, answers.reported FROM questions FULL OUTER JOIN answers ON (questions.question_id = answers.question_id) FULL OUTER JOIN answerphotos ON (answers.id = answerphotos.answer_id) WHERE product_id = $1 AND questions.reported = false AND answers.reported = false AND questions.question_id IN (SELECT DISTINCT questions.question_id FROM questions WHERE questions.reported = false AND product_id = $1 ORDER BY questions.question_id LIMIT $2 OFFSET $3) ORDER BY questions.question_id';
  var queryParams = [product_id, count, page - 1];
  return db.query(queryString, queryParams);
};

exports.getAnswerPhotos = (answer_id) => {
  var queryString = 'SELECT id, url FROM answerphotos WHERE answer_id = $1';
  var queryParams = [answer_id];
  return db.query(queryString, queryParams);
}

exports.getAnswers = (question_id) => {
  var queryString = 'SELECT id, body, date, answerer_name, helpfulness FROM answers WHERE question_id = $1 AND reported = false';
  var queryParams = [question_id];
  return db.query(queryString, queryParams);
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