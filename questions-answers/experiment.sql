
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


-- QUERY FOR getAnswers --
SELECT answers.id, answers.body, answers.date, answers.answerer_name, answers.helpfulness, answerphotos.photo_id, answerphotos.url
FROM answers
FULL OUTER JOIN answerphotos
ON (answers.id = answerphotos.answer_id)
WHERE answers.question_id = 1
AND answers.reported = false
AND answers.id IN (SELECT DISTINCT answers.id FROM answers WHERE answers.reported = false AND answers.question_id = 1 ORDER BY answers.id LIMIT 3 OFFSET 0)
ORDER BY answers.id;


-- condensed version:
SELECT answers.id, answers.body, answers.date, answers.answerer_name, answers.helpfulness, answerphotos.photo_id, answerphotos.url FROM answers FULL OUTER JOIN answerphotos ON (answers.id = answerphotos.answer_id) WHERE answers.question_id = $1 AND answers.reported = false AND answers.id IN (SELECT DISTINCT answers.id FROM answers WHERE answers.reported = false AND answers.question_id = $1 ORDER BY answers.id LIMIT $2 OFFSET $3) ORDER BY answers.id;


-- QUERY FOR addQuestion --
INSERT INTO questions(question_id, question_body, question_date, asker_name, product_id, email, question_helpfulness)
VALUES (((SELECT MAX(question_id) FROM questions) + 1), $1, CURRENT_TIMESTAMP, $2, $4, $3, 0)

-- for testing:
SELECT * FROM questions WHERE question_body IS "charles was here";


-- QUERY FOR addAnswer --
INSERT INTO answers(id, body, date, answerer_name, helpfulness, question_id, email)
VALUES (((SELECT MAX(id) FROM answers) + 1), $1, CURRENT_TIMESTAMP, $2, $3, $4, $5)
RETURNING id;

-- QUERY FOR addPhoto --
INSERT INTO answerphotos(photo_id, url, answer_id)
VALUES (((SELECT MAX(photo_id) FROM answerphotos) + 1), $1, $2);

-- for testing:
SELECT MAX(photo_id) FROM answerphotos;
SELECT * FROM answerphotos WHERE photo_id = 2063760;