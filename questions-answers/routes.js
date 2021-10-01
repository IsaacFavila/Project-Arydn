var controller = require('./controller.js');
var router = require('express').Router();

router.get('/questions', controller.getQuestions);
router.get('/questions/:question_id/answers', controller.getAnswers);

router.post('/questions', controller.addQuestion);
router.post('/questions/:question_id/answers', controller.addAnswer);

router.put('/questions/:question_id/helpful', controller.markQuestionHelpful);
router.put('/questions/:question_id/report', controller.reportQuestion);
router.put('/answers/:answer_id/helpful', controller.markAnswerHelpful);
router.put('/answers/:answer_id/report', controller.reportAnswer);

module.exports = router;



