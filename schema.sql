CREATE DATABASE grocery_db;

USE grocery_db;


CREATE TABLE farmers (
  id INTEGER NOT NULL AUTO_INCREMENT,
  farmer_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE products (
  product_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  farmer_id VARCHAR(30),
  PRIMARY KEY (product_id),
  FOREIGN KEY (farmer_id) references farmers (id)
  );
  
  
INSERT INTO farmers (farmer_name) 
VALUES ('Farm Girl');
INSERT INTO farmers (farmer_name) 
VALUES ('Farm Man');
  
  
INSERT INTO products (product_name, farmer_id) 
VALUES ('Apple', 1);
INSERT INTO products (product_name, farmer_id) 
VALUES ('Apple', 2);
INSERT INTO products (product_name, farmer_id) 
VALUES ('Bananas', 1);
INSERT INTO products (product_name, farmer_id) 
VALUES ('Bananas', 2);
INSERT INTO products (product_name, farmer_id) 
VALUES ('Bread', 1);
INSERT INTO products (product_name, farmer_id) 
VALUES ('Bread', 2);