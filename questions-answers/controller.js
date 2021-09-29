

// Get question list for product
exports.getQuestions = function (req, res) {
  var body = req.body;
  console.log('BODY:', body)
  res.send('getQuestions')
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