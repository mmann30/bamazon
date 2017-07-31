-- Root Bamazon Schema --

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price FLOAT(15,2) NOT NULL,
    stock_quantity INT(10) NOT NULL DEFAULT 0,
    PRIMARY KEY (item_id)
);

-- Initial Mock products data --
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES 
    ("Claw Hammer", "Tools", 5.00, 8),
    ("Screwdriver", "Tools", 4.00, 10),
    ("Drill", "Tools", 99.00, 20),
    ("Lounge", "Furniture", 89.00, 16),
    ("Patio Table", "Furniture", 125.00, 4),
    ("Umbrella", "Furniture", 35.00, 6),
    ("Garden Soil", "Garden", 26.00, 50),
    ("Chimenea", "Garden", 181.00, 3),
    ("Seeds", "Garden", .99, 120),
    ("Paint", "Paint", 24.99, 40);
