const model = require('./model.js');

// Get question list for product
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
  var sliceURL = req.url.slice(11);
  var question_id = sliceURL.slice(0, sliceURL.indexOf('/'));

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
  model.addQuestion(req.body)
    .then(success => {
      res.send('success');
    })
    .catch(err => {
      console.log(err);
    })
};

// Add answer for question
exports.addAnswer = function (req, res) {
  var question_id = req.url.slice(11);
  question_id = question_id.slice(0, question_id.indexOf('/'));
  model.addAnswer(req.body, question_id)
    .then(success => {
      var answer_id = success.rows[0].id
      if (req.body.photos) {
        var photoPromises = [];
        for (var i = 0; i < req.body.photos.length; i++) {
          photoPromises.push(model.addPhoto(req.body.photos[i], answer_id));
        }
        Promise.all(photoPromises)
          .then(success => {
            res.send('success');
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        res.send([answer_id]);
      }
    })
    .catch(err => {
      console.log(err);
    })
};

// Mark question/answer as helpful/reported
exports.markHelpfulOrReport = function (req, res) {
  var table, idCol, idVal, incrementCol, sliceURL, queryString;

  if (req.url.indexOf('questions') !== -1) {
    table = 'questions';
    idCol = 'question_id';
    sliceURL = req.url.slice(11);
    idVal = sliceURL.slice(0, sliceURL.indexOf('/'));
    if (req.url.indexOf('helpful') !== -1) {
      incrementCol = 'question_helpfulness';
    } else {
      incrementCol = 'reported';
    }
  } else {
    table = 'answers';
    idCol = 'id';
    sliceURL = req.url.slice(9);
    idVal = sliceURL.slice(0, sliceURL.indexOf('/'));
    if (req.url.indexOf('helpful') !== -1) {
      incrementCol = 'helpfulness';
    } else {
      incrementCol = 'reported';
    }
  }

  if (incrementCol === 'reported') {
    queryString = `UPDATE ${table} SET ${incrementCol} = true WHERE ${idCol} = ${idVal}`;
  } else {
    queryString = `UPDATE ${table} SET ${incrementCol} = ${incrementCol} + 1 WHERE ${idCol} = ${idVal}`;
  }

  model.markHelpfulOrReport(queryString)
    .then(success => {
      res.send(204);
    })
    .catch(err => {
      console.log(err);
    })
};