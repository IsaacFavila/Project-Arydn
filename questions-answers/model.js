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

exports.getAnswers = (question_id, page, count) => {
  var queryString = 'SELECT answers.id, answers.body, answers.date, answers.answerer_name, answers.helpfulness, answerphotos.photo_id, answerphotos.url FROM answers FULL OUTER JOIN answerphotos ON (answers.id = answerphotos.answer_id) WHERE answers.question_id = $1 AND answers.reported = false AND answers.id IN (SELECT DISTINCT answers.id FROM answers WHERE answers.reported = false AND answers.question_id = $1 ORDER BY answers.id LIMIT $2 OFFSET $3) ORDER BY answers.id';
  var queryParams = [question_id, count, page - 1];
  return db.query(queryString, queryParams);
};


exports.addQuestion = ({body, name, email, product_id}) => {
  var queryString = 'INSERT INTO questions(question_id, question_body, question_date, asker_name, product_id, email, question_helpfulness) VALUES (((SELECT MAX(question_id) FROM questions) + 1), $1, CURRENT_TIMESTAMP, $2, $4, $3, 0)';
  var queryParams = [body, name, email, product_id];
  return db.query(queryString, queryParams);
};

exports.addAnswer = ({body, name, email, photos}, question_id) => {
  var queryString = 'INSERT INTO answers(id, body, date, answerer_name, helpfulness, question_id, email) VALUES (((SELECT MAX(id) FROM answers) + 1), $1, CURRENT_TIMESTAMP, $2, $3, $4, $5) RETURNING id';
  var queryParams = [body, name, 0, question_id, email];
  return db.query(queryString, queryParams);
};

exports.addPhoto = (url, answer_id) => {
  var queryString = 'INSERT INTO answerphotos(photo_id, url, answer_id) VALUES (((SELECT MAX(photo_id) FROM answerphotos) + 1), $1, $2)';
  var queryParams = [url, answer_id];
  return db.query(queryString, queryParams);
};

exports.markHelpfulOrReport = (queryString) => {
  return db.query(queryString);
};