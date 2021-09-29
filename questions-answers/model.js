const app = require('../index.js');
const db = require('./index.js');

exports.getQuestions = () => {
  db.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    db.end()
  })
};

exports.getAnswers = () => {

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