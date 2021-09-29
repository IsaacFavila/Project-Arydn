const model = require('./model.js');

// Get question list for product
exports.getQuestions = function (req, res) {
  // model.getQuestions(req.body, (err, questionData) => {
  //   if (err) {
  //     console.log('QA Model Error:', err);
  //   } else {
  //     var questions = questionData.rows;

  //     for (var i = 0; i < questions.length; i++) {
  //       model.getAnswers(questions[i]['question_id'], (err, answerData) => {
  //         if (err) {
  //           console.log('getAnswers Model Error:', err);
  //         } else {
  //           questions[i].answers = answerData;
  //         }
  //       })
  //     }

  //     res.send({
  //       product_id: req.body.product_id,
  //       results: questions
  //     })
  //   }
  // })
  model.getQuestions(req.body)
    .then(questionData => {
      var questions = questionData.rows;
      var promises = [];
      for (var i = 0; i < questions.length; i++) {
        promises.push(model.getAnswers(questions[i]['question_id']));
      }
      Promise.all(promises)
        .then(answers => {
          console.log('ANSWERS:', answers)
          for (var i = 0; i < answers.length; i++) {
            var answerObj = {};
            for (var j = 0; j < answers[i].rows.length; j++) {
              answerObj[answers[i].rows[j].id] = answers[i].rows[j];
            }
            questions[i].answers = answerObj;
          }
          res.send({
            product_id: req.body.product_id,
            results: questions
          })
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err)
    })
};

// Get answers for question
exports.getAnswers = function (req, res) {
  // how to handle a variable in url?
  var body = req.body;
  console.log('BODY:', body)
  res.send('getAnswers')
};

// Add question for product
exports.addQuestion = function (req, res) {
  var body = req.body;
  console.log('BODY:', body)
  res.send('addQuestion')
};

// Add answer for question
exports.addAnswer = function (req, res) {
  var body = req.body;
  console.log('BODY:', body)
  res.send('addAnswer')
};

// Mark question as helpful
exports.markQuestionHelpful = function (req, res) {
  var body = req.body;
  console.log('BODY:', body)
  res.send('markQuestionHelpful')
};

// Report question
exports.reportQuestion = function (req, res) {
  var body = req.body;
  console.log('BODY:', body)
  res.send('reportQuestion')
};

// Mark answer as helpful
exports.markAnswerHelpful = function (req, res) {
  var body = req.body;
  console.log('BODY:', body)
  res.send('markAnswerHelpful')
};

// Report answer
exports.reportAnswer = function (req, res) {
  var body = req.body;
  console.log('BODY:', body)
  res.send('reportAnswer')
};