DROP DATABASE IF EXISTS reviewsdb;

CREATE DATABASE reviewsdb;

USE reviewsdb;

DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE products (
  product_id INT UNIQUE,
  product_page INT NULL DEFAULT NULL,
  product_count INT NULL DEFAULT NULL,
  PRIMARY KEY (product_id)
);

CREATE TABLE reviews (
  review_id INT UNIQUE,
  product_id INT NULL DEFAULT NULL,
  rating INT NULL DEFAULT NULL,
  summary VARCHAR(50) NULL DEFAULT NULL,
  recommend BOOLEAN NOT NULL,
  response VARCHAR(50) NULL DEFAULT NULL,
  review_body VARCHAR(50) NULL DEFAULT NULL,
  review_date DATE NULL DEFAULT NULL,
  reviewer_name VARCHAR(50) NULL DEFAULT NULL,
  review_helpfulness INT NULL DEFAULT NULL,
  PRIMARY KEY (review_id)
);

DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE photos (
  photo_id INT UNIQUE,
  review_id INT NULL DEFAULT NULL,
  photos_url VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (photo_id)
);

CREATE TABLE characteristics (
  product_id INT NULL DEFAULT NULL,
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
);

CREATE TABLE size (
  product_id INT NOT NULL,
  size_id INT NULL DEFAULT NULL,
  size_value INT NULL DEFAULT NULL,
  PRIMARY KEY (product_id)
);

CREATE TABLE width (
  product_id INT NOT NULL,
  width_id INT NULL DEFAULT NULL,
  width_value INT NULL DEFAULT NULL,
  PRIMARY KEY (product_id)
);

CREATE TABLE comfort (
  product_id INT NOT NULL,
  comfort_id INT NULL DEFAULT NULL,
  comfort_value INT NULL DEFAULT NULL,
  PRIMARY KEY (product_id)
);
-- ---
-- Foreign Keys
-- ---

ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
ALTER TABLE photos ADD FOREIGN KEY (review_id) REFERENCES reviews (review_id);
ALTER TABLE characteristics ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
ALTER TABLE size ADD FOREIGN KEY (product_id) REFERENCES characteristics (product_id);
ALTER TABLE width ADD FOREIGN KEY (product_id) REFERENCES characteristics (product_id);
ALTER TABLE comfort ADD FOREIGN KEY (product_id) REFERENCES characteristics (product_id);

-- mysql -u root -p mysql.sql