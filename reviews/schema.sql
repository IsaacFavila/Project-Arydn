DROP DATABASE reviewsdb;
CREATE DATABASE reviewsdb;
USE reviewsdb;

-- CREATE TABLE products (
--   product_id INT UNIQUE,
--   product_page INT NULL DEFAULT NULL,
--   product_count INT NULL DEFAULT NULL,
--   PRIMARY KEY (product_id)
-- );

CREATE TABLE reviews (
  id INT UNIQUE,
  product_id INT NULL DEFAULT NULL,
  rating INT NULL DEFAULT NULL,
  review_date BIGINT(20) NOT NULL,
  summary VARCHAR(255) NULL DEFAULT NULL,
  body VARCHAR(1000) NULL DEFAULT NULL,
  recommend VARCHAR(255) NULL DEFAULT NULL,
  reported VARCHAR(255) NULL DEFAULT NULL, 
  reviewer_name VARCHAR(255) NULL DEFAULT NULL,
  reviewer_email VARCHAR(255) NULL DEFAULT NULL,
  response VARCHAR(255) NULL DEFAULT NULL,
  helpfulness INT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX reviews_product_id_idx
ON reviews (product_id);

CREATE TABLE characteristics (
  id INT UNIQUE,
  product_id INT NULL DEFAULT NULL,
  char_name VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE characteristic_reviews (
  id INT UNIQUE,
  characteristic_id INT NULL DEFAULT NULL,
  review_id INT NULL DEFAULT NULL,
  char_value VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE reviews_photos (
  id INT UNIQUE,
  review_id INT NULL DEFAULT NULL,
  photos_url VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

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

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE characteristics ADD FOREIGN KEY (product_id) REFERENCES reviews (product_id);
-- ALTER TABLE characteristic_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics (id);
-- ALTER TABLE reviews_photos ADD FOREIGN KEY (review_id) REFERENCES reviews (id);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

-- mysql -u root -p schema.sql