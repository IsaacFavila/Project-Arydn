DROP DATABASE IF EXISTS questions_answers;

CREATE DATABASE questions_answers;

\c questions_answers;

DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
  question_id INTEGER NULL DEFAULT NULL,
  question_body TEXT NULL DEFAULT NULL,
  question_date DATE NULL DEFAULT NULL,
  asker_name TEXT NULL DEFAULT NULL,
  question_helpfulness INTEGER NULL DEFAULT NULL,
  reported TEXT NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  email TEXT NULL DEFAULT NULL,
  PRIMARY KEY (question_id)
);

-- ---
-- Table answers
--
-- ---

DROP TABLE IF EXISTS answers CASCADE;

CREATE TABLE answers (
  id INTEGER NULL DEFAULT NULL,
  body TEXT NULL DEFAULT NULL,
  date DATE NULL DEFAULT NULL,
  answerer_name TEXT NULL DEFAULT NULL,
  helpfulness INTEGER NULL DEFAULT NULL,
  reported TEXT NULL DEFAULT NULL,
  question_id INTEGER NULL DEFAULT NULL,
  email TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table photos
--
-- ---

DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE photos (
  photo_id INTEGER NULL DEFAULT NULL,
  url TEXT NULL DEFAULT NULL,
  question_id INTEGER NULL DEFAULT NULL,
  answer_id INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (photo_id)
);

-- ---
-- Table products
--
-- ---

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  product_id INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (product_id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE questions ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (question_id);
ALTER TABLE photos ADD FOREIGN KEY (question_id) REFERENCES questions (question_id);
ALTER TABLE photos ADD FOREIGN KEY (answer_id) REFERENCES answers (id);