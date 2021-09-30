const model = require('./model.js');

// // Get question list for product
// exports.getQuestions = function (req, res) {
//   model.getQuestions(req.body)
//     .then(questionData => {
//       var questions = questionData.rows;
//       var answerPromises = [];
//       for (var i = 0; i < questions.length; i++) {
//         answerPromises.push(model.getAnswers(questions[i]['question_id']));
//       }
//       Promise.all(answerPromises)
//         .then(answers => {
//           for (var i = 0; i < answers.length; i++) {
//             var answerObj = {};
//             for (var j = 0; j < answers[i].rows.length; j++) {
//               answers[i].rows[j].photos = ['charles'];
//               answerObj[answers[i].rows[j].id] = answers[i].rows[j];
//             }
//             questions[i].answers = answerObj;
//           }
//           res.send({
//             product_id: req.body.product_id,
//             results: questions
//           })
//         //   return questions;
//         // })
//         // .then(questions => {
//         //   for (var i = 0; i < questions.length; i++) {
//         //     var answers = questions[i].answers;
//         //     var photoPromises = [];
//         //     for (var id in answers) {
//         //       var answerPhotos = [];
//         //       Promise.resolve(model.getAnswerPhotos(id))
//         //         .then(photos => {
//         //           answerPhotos.push(photos)
//         //         })
//         //     }
//         //     Promise.all(photoPromises)
//         //       .then(photos => {
//         //         console.log('PHOTOS:', photos)
//         //         for (var i = 0; i < photos.length; i++) {
//         //           var photoArr = [];

//         //         }
//         //         res.send(photos)
//         //       })
//         //   }
//         })

//         .catch(err => {
//           console.log(err);
//         })
//     })
//     .catch(err => {
//       console.log(err)
//     })
// };

// TEST ANOTHER IDEA
exports.getQuestions = function (req, res) {
  model.getQuestions(req.body)
    .then(structure => {
      structure = structure.rows;
      model.getQuestionsTwo(req.body)
        .then(joinData => {
          joinData = joinData.rows;
          for (var i = 0; i < joinData.length; i++) {
            var currEntry = joinData[i];
            for (var j = 0; j < structure.length; j++) {
              var currQuestion = structure[j];
              if (currEntry.question_id === currQuestion.question_id) {
                currQuestion.answers = currQuestion.answers || {};
                if (currEntry.id && !currQuestion.answers[currEntry.id]) {
                  currQuestion.answers[currEntry.id] = {
                    id: currEntry.id,
                    body: currEntry.body,
                    date: currEntry.date,
                    answerer_name: currEntry.answerer_name,
                    helpfulness: currEntry.helpfulness,
                    reported: currEntry.reported
                  }
                }
                if (!currQuestion.answers[currEntry.id].photos) {
                  currQuestion.answers[currEntry.id].photos = [];
                }
                if (currEntry.photo_id) {
                  currQuestion.answers[currEntry.id].photos.push({
                    id: currEntry.photo_id,
                    url: currEntry.url
                  })
                }
              }
            }
          }
          for (var i = 0; i < structure.length; i++) {
            if (!structure[i].answers) {
              structure[i].answers = {};
            }
          }
          var data = {
              product_id: req.body.product_id,
              results: structure
            }
          res.send(data)
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err);
    })
  }

// Get answers for question
exports.getAnswers = function (req, res) {
  var urlParams = new URLSearchParams(req.url.slice(req.url.indexOf('?')));
  var count = urlParams.get('count');
  var page = urlParams.get('page');
  var sliceURL = req.url.slice(11)
  var question_id = sliceURL.slice(0, sliceURL.indexOf('/'))

  model.getAnswers(question_id, page, count)
    .then(joinData => {
      joinData = joinData.rows;
      var data = {
        question: question_id,
        page: page,
        count: count,
      }

      var results = [];
      var answers = {};
      for (var i = 0; i < joinData.length; i++) {
        var currEntry = joinData[i];
        if (!answers[currEntry.id]) {
          answers[currEntry.id] = {
            answer_id: currEntry.id,
            body: currEntry.body,
            date: currEntry.date,
            answerer_name: currEntry.answerer_name,
            helpfulness: currEntry.helpfulness
          }
        }
        if (!answers[currEntry.id].photos) {
          answers[currEntry.id].photos = [];
        }
        if (currEntry.photo_id) {
          answers[currEntry.id].photos.push({
            id: currEntry.photo_id,
            url: currEntry.url
          })
        }
      }
      for (var answer in answers) {
        results.push(answers[answer]);
      }
      data.results = results;
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    })

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