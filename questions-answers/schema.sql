-- --------------------------------
-- CREATE DATABASE ----------------
-- --------------------------------

-- QUESTIONS_ANSWERS --------------

DROP DATABASE IF EXISTS questions_answers;

CREATE DATABASE questions_answers;

-- Connect to the database
\c questions_answers;


-- --------------------------------
-- CREATE HELPER TABLES -----------
-- --------------------------------

-- -- PRODUCTS -----------------------

-- DROP TABLE IF EXISTS productshelper CASCADE;

-- CREATE TABLE productshelper (
--   id INTEGER NULL DEFAULT NULL,
--   name TEXT NULL DEFAULT NULL,
--   slogan TEXT NULL DEFAULT NULL,
--   description TEXT NULL DEFAULT NULL,
--   category TEXT NULL DEFAULT NULL,
--   default_price INTEGER NULL DEFAULT NULL,
--   empty_column TEXT NULL DEFAULT NULL,
--   PRIMARY KEY (id)
-- );

-- --------------------------------
-- CREATE ACTUAL TABLES -----------
-- --------------------------------

-- QUESTIONS ----------------------

DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
  question_id SERIAL,
  question_body TEXT NULL DEFAULT NULL,
  question_date VARCHAR NULL DEFAULT NULL,
  asker_name TEXT NULL DEFAULT NULL,
  question_helpfulness INTEGER NULL DEFAULT NULL,
  reported TEXT NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  email TEXT NULL DEFAULT NULL,
  PRIMARY KEY (question_id)
);

-- ANSWERS ------------------------

DROP TABLE IF EXISTS answers CASCADE;

CREATE TABLE answers (
  id SERIAL,
  body TEXT NULL DEFAULT NULL,
  date VARCHAR NULL DEFAULT NULL,
  answerer_name TEXT NULL DEFAULT NULL,
  helpfulness INTEGER NULL DEFAULT NULL,
  reported TEXT NULL DEFAULT NULL,
  question_id INTEGER NULL DEFAULT NULL,
  email TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ANSWER PHOTOS ------------------

DROP TABLE IF EXISTS answerphotos CASCADE;

CREATE TABLE answerphotos (
  photo_id SERIAL,
  url TEXT NULL DEFAULT NULL,
  answer_id INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (photo_id)
);

-- -- PRODUCTS -----------------------

-- DROP TABLE IF EXISTS products CASCADE;

-- CREATE TABLE products (
--   product_id INTEGER NULL DEFAULT NULL,
--   PRIMARY KEY (product_id)
-- );


-- --------------------------------
-- POPULATE TABLES ----------------
-- --------------------------------

-- QUESTIONS ----------------------

-- Copy all CSV data into table
\COPY  questions (question_id, product_id, question_body, question_date, asker_name, email, reported, question_helpfulness) FROM '../data/questions.csv' DELIMITER ',' CSV HEADER;

-- Convert Unix Epoch time (milliseconds) to timestamp
    -- divide by 1000 is because it's milliseconds, not seconds
    -- 'double precision' preserves the milliseconds in the conversion
UPDATE questions SET question_date=TO_TIMESTAMP(question_date::DOUBLE PRECISION / 1000);

-- Convert 'reported' column to booleans instead of 0/1. (Apparently postgres stores booleans as f/t rather than the full words)
ALTER TABLE questions ALTER COLUMN reported DROP DEFAULT;
ALTER TABLE questions ALTER reported TYPE bool USING CASE WHEN reported='0' THEN FALSE ELSE TRUE END;
ALTER TABLE questions ALTER COLUMN reported SET DEFAULT FALSE;

-- -- Show in terminal
-- SELECT * FROM questions;


-- ANSWERS ------------------------

-- Copy all CSV data into table
\COPY  answers (id, question_id, body, date, answerer_name, email, reported, helpfulness) FROM '../data/answers.csv' DELIMITER ',' CSV HEADER;

-- Convert Unix Epoch time (milliseconds) to timestamp
    -- divide by 1000 is because it's milliseconds, not seconds
    -- 'double precision' preserves the milliseconds in the conversion
UPDATE answers SET date=TO_TIMESTAMP(date::DOUBLE PRECISION / 1000);

-- Convert 'reported' column to booleans instead of 0/1. (Apparently postgres stores booleans as f/t rather than the full words)
ALTER TABLE answers ALTER COLUMN reported DROP DEFAULT;
ALTER TABLE answers ALTER reported TYPE bool USING CASE WHEN reported='0' THEN FALSE ELSE TRUE END;
ALTER TABLE answers ALTER COLUMN reported SET DEFAULT FALSE;

-- -- Show in terminal
-- SELECT * FROM answers;


-- ANSWER PHOTOS ------------------

-- Copy all CSV data into table
\COPY  answerphotos (photo_id, answer_id, url) FROM '../data/answers_photos.csv' DELIMITER ',' CSV HEADER;

-- -- Show in terminal
-- SELECT * FROM answerphotos;


-- -- PRODUCTS -----------------------

-- -- Copy all CSV data into table
-- \COPY productshelper (id, name, slogan, description, category, default_price, empty_column) FROM '../data/products_sample.csv' DELIMITER ',' CSV HEADER;

-- -- Export only the ID column to a CSV
-- \COPY productshelper (id) TO '../data/products_sample_ids.csv' DELIMITER ',' CSV HEADER;

-- -- Delete productshelper table
-- DROP TABLE IF EXISTS productshelper CASCADE;

-- -- Copy CSV of IDs into products table
-- \COPY products (product_id) FROM '../data/products_sample_ids.csv' DELIMITER ',' CSV HEADER;

-- -- Show in terminal
-- SELECT * FROM products;


-- --------------------------------
-- FOREIGN KEYS -------------------
-- --------------------------------

ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (question_id);
ALTER TABLE answerphotos ADD FOREIGN KEY (answer_id) REFERENCES answers (id);
-- ALTER TABLE questions ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
-- ---
