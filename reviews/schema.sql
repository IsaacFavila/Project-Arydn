DROP DATABASE IF EXISTS reviewsdb;
CREATE DATABASE reviewsdb;
USE reviewsdb;

-- CREATE TABLE products (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(255) NULL DEFAULT NULL,
--   slogan VARCHAR(255) NULL DEFAULT NULL,
--   description VARCHAR(255) NULL DEFAULT NULL,
--   category VARCHAR(255) NULL DEFAULT NULL,
--   default_price INTEGER NULL DEFAULT NULL
-- );

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  rating INT,
  review_date BIGINT(20),
  summary VARCHAR(255),
  body VARCHAR(1000),
  recommend VARCHAR(255),
  reported VARCHAR(255), 
  reviewer_name VARCHAR(255),
  reviewer_email VARCHAR(255),
  response VARCHAR(255),
  helpfulness INT,
  INDEX reviews_pid_ind (product_id)
);

ALTER TABLE reviews RENAME COLUMN id TO review_id;

CREATE TABLE characteristics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  char_name VARCHAR(50),
  FOREIGN KEY(product_id) REFERENCES reviews(product_id),
  INDEX char_pid_ind (product_id)
);

CREATE TABLE characteristic_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  characteristic_id INT NULL DEFAULT NULL,
  review_id INT NULL DEFAULT NULL,
  char_value VARCHAR(50) NULL DEFAULT NULL,
  FOREIGN KEY(characteristic_id) REFERENCES characteristics(id),
  FOREIGN KEY(review_id) REFERENCES reviews(review_id),
  INDEX char_pid_ind (characteristic_id)
);

CREATE TABLE reviews_photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  review_id INT NULL DEFAULT NULL,
  photos_url VARCHAR(255) NULL DEFAULT NULL,
  FOREIGN KEY(review_id) REFERENCES reviews(review_id)
);


-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE characteristics ADD
-- CONSTRAINT fk_characteristics_reviews_pid
-- FOREIGN KEY (product_id) 
-- REFERENCES reviews(product_id);
-- ON UPDATE CASCADE
-- ON DELETE RESTRICT;

-- ALTER TABLE characteristic_reviews 
-- ADD FOREIGN KEY (characteristic_id) 
-- REFERENCES characteristics (id);

-- ALTER TABLE reviews_photos 
-- ADD FOREIGN KEY (review_id) 
-- REFERENCES reviews (id);

LOAD DATA INFILE '/Users/Shared/reviews.csv'
INTO TABLE reviews
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
-- (id,product_id,rating,@var1,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness)
-- SET review_date = STR_TO_DATE(@var1, '%Y%m%d%H%i%s');

LOAD DATA INFILE '/Users/Shared/characteristics.csv'
INTO TABLE characteristics
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/Users/Shared/characteristic_reviews.csv'
INTO TABLE characteristic_reviews
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/Users/Shared/reviews_photos.csv'
INTO TABLE reviews_photos
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';




-- mysql -u root -p schema.sql