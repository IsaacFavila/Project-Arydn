
-- QUERY FOR getQuestionsTwo --
SELECT questions.question_id, questions.question_body, questions.question_date, questions.asker_name, questions.question_helpfulness, questions.reported,

answers.id, answers.body, answers.date, answers.answerer_name, answers.helpfulness,

answerphotos.photo_id, answerphotos.url, answerphotos.answer_id, answers.reported AS answer_reported

FROM questions
FULL OUTER JOIN answers
ON (questions.question_id = answers.question_id)
FULL OUTER JOIN answerphotos
ON (answers.id = answerphotos.answer_id)
WHERE product_id = 1 AND questions.reported = false
AND questions.question_id IN (SELECT DISTINCT questions.question_id FROM questions WHERE questions.reported = false AND product_id = 1 ORDER BY questions.question_id LIMIT 3 OFFSET 1)
ORDER BY questions.question_id;


