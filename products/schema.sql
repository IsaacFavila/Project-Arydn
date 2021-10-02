DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

-- ---
-- Table 'products'
--
-- ---

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  id INTEGER NULL DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  slogan VARCHAR NULL DEFAULT NULL,
  description VARCHAR NULL DEFAULT NULL,
  category VARCHAR NULL DEFAULT NULL,
  default_price INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'related'
--
-- ---

DROP TABLE IF EXISTS related CASCADE;

CREATE TABLE related (
  id INTEGER NULL DEFAULT NULL,
  current_product_id INTEGER NULL DEFAULT NULL,
  related_product_id INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'styles'
--
-- ---

DROP TABLE IF EXISTS styles CASCADE;

CREATE TABLE styles (
  id INTEGER NULL DEFAULT NULL,
  productId INTEGER NULL DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  sale_price VARCHAR NULL DEFAULT NULL,
  original_price INTEGER NULL DEFAULT NULL,
  default_style BOOLEAN NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'features'
--
-- ---

DROP TABLE IF EXISTS features CASCADE;

CREATE TABLE features (
  id INTEGER NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  feature VARCHAR NULL DEFAULT NULL,
  value VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE photos (
  id INTEGER NULL DEFAULT NULL,
  styleId INTEGER NULL DEFAULT NULL,
  url VARCHAR NULL DEFAULT NULL,
  thumbnail_url VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'skus'
--
-- ---

DROP TABLE IF EXISTS skus CASCADE;

CREATE TABLE skus (
  id INTEGER NULL DEFAULT NULL,
  styleId INTEGER NULL DEFAULT NULL,
  size VARCHAR NULL DEFAULT NULL,
  quantity INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE related ADD FOREIGN KEY (current_product_id) REFERENCES products (id);
ALTER TABLE styles ADD FOREIGN KEY (productId) REFERENCES products (id);
ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE photos ADD FOREIGN KEY (styleId) REFERENCES styles (id);
ALTER TABLE skus ADD FOREIGN KEY (styleId) REFERENCES styles (id);

-- ---
-- Test Data
-- ---

-- INSERT INTO `products` (`id`,`name`,`slogan`,`description`,`category`,`default_price`) VALUES
-- ('','','','','','');
-- INSERT INTO `related` (`id`,`product_id`) VALUES
-- ('','');
-- INSERT INTO `styles` (`id`,`name`,`original_price`,`sale_price`,`default`,`product_id`) VALUES
-- ('','','','','','');
-- INSERT INTO `features` (`id`,`feature`,`value`,`product_id`) VALUES
-- ('','','','');
-- INSERT INTO `photos` (`id`,`thumbnail`,`url`,`style_id`) VALUES
-- ('','','','');
-- INSERT INTO `skus` (`id`,`quantity`,`size`,`style_id`) VALUES
-- ('','','','');