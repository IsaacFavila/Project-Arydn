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
-- Populate tables
-- ---
\COPY products FROM '/Users/isaacmfavila/Downloads/product.csv' delimiter ',' csv header;
\COPY related FROM '/Users/isaacmfavila/Downloads/related.csv' delimiter ',' csv header;
\COPY styles FROM '/Users/isaacmfavila/Downloads/styles.csv' delimiter ',' csv header;
\COPY features FROM '/Users/isaacmfavila/Downloads/features.csv' delimiter ',' csv header;
\COPY photos FROM '/Users/isaacmfavila/Downloads/photos.csv' delimiter ',' csv header;
\COPY skus FROM '/Users/isaacmfavila/Downloads/skus.csv' delimiter ',' csv header;

-- ---
-- Indices
-- ---
CREATE INDEX related_current_product_id ON related(current_product_id);
CREATE INDEX features_product_id ON features(product_id);
CREATE INDEX styles_product_id ON styles(productId);
CREATE INDEX photos_style_id ON photos(styleId);
CREATE INDEX skus_style_id ON skus(styleId);

