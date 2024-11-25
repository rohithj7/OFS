DROP DATABASE IF EXISTS OFS;

CREATE DATABASE OFS;

USE OFS;

CREATE TABLE LOGIN (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    EMAIL VARCHAR(255) NOT NULL UNIQUE,
    PASSWORD VARCHAR(255) NOT NULL,
    ACCOUNTCREATIONDATE DATE NOT NULL,
    ROLE ENUM('admin', 'customer', 'supplier', 'employee') NOT NULL DEFAULT 'customer',
    FIRST_TIME_LOGIN BOOLEAN NOT NULL DEFAULT TRUE
);

-- TABLE FOR GENERAL INFO
CREATE TABLE INFO (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    LOGINID INT NOT NULL,
    ADDRESS VARCHAR(255),
    LATITUDE DECIMAL(10, 8),
    LONGITUDE DECIMAL(11, 8),
    PHONE VARCHAR(20),
    FOREIGN KEY (LOGINID) REFERENCES LOGIN(ID) ON DELETE CASCADE
);

-- TABLE FOR EMPLOYEES
CREATE TABLE EMPLOYEES (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    LOGINID INT NOT NULL,
    FIRSTNAME VARCHAR(255),
    LASTNAME VARCHAR(255),
    SSN CHAR(64) UNIQUE,  -- ASSUMING THE SSN IS HASHED, ADD UNIQUE CONSTRAINT
    EMAIL VARCHAR(255),
    PHONE VARCHAR(20),
    ADDRESS VARCHAR(255),
    SALARY DECIMAL(10, 2),  -- HOURLY SALARY
    STARTDATE DATE,
    ENDDATE DATE,
    FOREIGN KEY (LOGINID) REFERENCES LOGIN(ID) ON DELETE CASCADE
);

-- TABLE FOR EMPLOYEE HOURS
CREATE TABLE EMPLOYEE_HOURS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    EMPLOYEEID INT NOT NULL,
    HOURSWORKED DECIMAL(5, 2),  -- BI-WEEKLY BASIS
    FOREIGN KEY (EMPLOYEEID) REFERENCES EMPLOYEES(ID) ON DELETE CASCADE
);

-- TABLE FOR PRODUCT CATEGORY
CREATE TABLE PRODUCT_CATEGORY (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    CATEGORYNAME VARCHAR(255) NOT NULL
);

-- PRODUCT CATEGORIES ARE HARDCODED IN
INSERT INTO PRODUCT_CATEGORY (CATEGORYNAME)
VALUES ('Fruits'),
       ('Vegetables'),
       ('Meats'),
       ('Dairy'),
       ('Snacks'),
       ('Meals');

-- TABLE FOR PRODUCTS
CREATE TABLE PRODUCTS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    CATEGORYID INT,
    PRODUCTNAME VARCHAR(255),
    PRODUCTDESCRIPTION TEXT,
    BRAND VARCHAR(255),  -- Brand of the product
    PICTURE_URL VARCHAR(255),  -- URL to product image
    QUANTITY INT,
    REORDERLEVEL INT,
    REORDERQUANTITY INT,
    PRICE DECIMAL(10, 2),
    WEIGHT DECIMAL(5, 2),  -- PER UNIT
    FOREIGN KEY (CATEGORYID) REFERENCES PRODUCT_CATEGORY(ID) ON DELETE SET NULL
);

-- TABLE FOR SUPPLIERS
CREATE TABLE SUPPLIERS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    LOGINID INT NOT NULL,
    SUPPLIERNAME VARCHAR(255),
    EMAIL VARCHAR(255),
    PHONE VARCHAR(20),
    ADDRESS VARCHAR(255),
    FOREIGN KEY (LOGINID) REFERENCES LOGIN(ID) ON DELETE CASCADE
);

-- TABLE FOR CUSTOMERS
CREATE TABLE CUSTOMERS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    LOGINID INT NOT NULL,
    FIRSTNAME VARCHAR(255),
    LASTNAME VARCHAR(255),
    PHONE VARCHAR(20),
    ADDRESS VARCHAR(255),
    LATITUDE DECIMAL(10, 8),
    LONGITUDE DECIMAL(11, 8),
    FOREIGN KEY (LOGINID) REFERENCES LOGIN(ID) ON DELETE CASCADE
);

-- TABLE FOR SALES
CREATE TABLE SALES (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    CUSTOMERID INT,
    PRICE DECIMAL(10, 2), -- TOTAL PRICE
    SALEDATE DATE,
    PAYMENTDETAILS VARCHAR(255),
    SALE_STATUS ENUM('NOT STARTED', 'ONGOING', 'COMPLETED') NOT NULL,
    DELIVERYFEE DECIMAL(10, 2) DEFAULT 0.00,
    FOREIGN KEY (CUSTOMERID) REFERENCES CUSTOMERS(ID) ON DELETE SET NULL
);

-- TABLE FOR SALES PRODUCTS
CREATE TABLE SALES_PRODUCTS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    SALESID INT NOT NULL,
    PRODUCTID INT NOT NULL,
    QUANTITY INT,
    PRICE DECIMAL(10, 2),  -- PRICE ACCOUNTED FOR QUANTITY
    FOREIGN KEY (SALESID) REFERENCES SALES(ID) ON DELETE CASCADE,
    FOREIGN KEY (PRODUCTID) REFERENCES PRODUCTS(ID)
);

-- TABLE FOR ORDERS
CREATE TABLE ORDERS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    PRICE DECIMAL(10, 2),  -- TOTAL PRICE
    ORDERDATE DATE,
    PAYMENTDETAILS VARCHAR(255),  -- TBD ONCE STRIPE IS INTEGRATED
    SUPPLIERID INT,
    ORDER_STATUS ENUM('NOT STARTED', 'ONGOING', 'COMPLETED') NOT NULL,
    FOREIGN KEY (SUPPLIERID) REFERENCES SUPPLIERS(ID) ON DELETE SET NULL
);

-- TABLE FOR ORDERS PRODUCTS
CREATE TABLE ORDERS_PRODUCTS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ORDERID INT NOT NULL,
    PRODUCTID INT NOT NULL,
    QUANTITY INT,
    PRICE DECIMAL(10, 2),  -- PRICE ACCOUNTED FOR QUANTITY
    FOREIGN KEY (ORDERID) REFERENCES ORDERS(ID) ON DELETE CASCADE,
    FOREIGN KEY (PRODUCTID) REFERENCES PRODUCTS(ID)
);

-- TABLE FOR BALANCE
CREATE TABLE BALANCE (
    ID INT PRIMARY KEY,
    BALANCE DECIMAL(10, 2),
    TIMESTAMP TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert initial balance record
INSERT INTO BALANCE (ID, BALANCE) VALUES (1, 0.00);

-- Indexes
CREATE UNIQUE INDEX idx_login_email ON LOGIN(EMAIL);
CREATE INDEX idx_products_productname ON PRODUCTS(PRODUCTNAME);
CREATE INDEX idx_suppliers_email ON SUPPLIERS(EMAIL);
CREATE INDEX idx_info_loginid ON INFO(LOGINID);
CREATE INDEX idx_employees_loginid ON EMPLOYEES(LOGINID);
CREATE INDEX idx_customers_loginid ON CUSTOMERS(LOGINID);
CREATE INDEX idx_suppliers_loginid ON SUPPLIERS(LOGINID);
CREATE INDEX idx_employee_hours_employeeid ON EMPLOYEE_HOURS(EMPLOYEEID);
CREATE INDEX idx_products_categoryid ON PRODUCTS(CATEGORYID);
CREATE INDEX idx_sales_customerid ON SALES(CUSTOMERID);
CREATE INDEX idx_orders_supplierid ON ORDERS(SUPPLIERID);
CREATE INDEX idx_sales_products_salesid_productid ON SALES_PRODUCTS(SALESID, PRODUCTID);
CREATE INDEX idx_orders_products_orderid_productid ON ORDERS_PRODUCTS(ORDERID, PRODUCTID);

DELIMITER //

CREATE TRIGGER trg_before_login_insert
BEFORE INSERT ON LOGIN
FOR EACH ROW
BEGIN
    IF NEW.ROLE = 'admin' AND (SELECT COUNT(*) FROM LOGIN WHERE ROLE = 'admin') >= 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only one admin is allowed.';
    END IF;
END //

-- Trigger to update BALANCE after a SALE is inserted
CREATE TRIGGER trg_after_sale_insert
AFTER INSERT ON SALES
FOR EACH ROW
BEGIN
    UPDATE BALANCE
    SET BALANCE = BALANCE + NEW.PRICE
    WHERE ID = 1;
END //

-- Trigger to update BALANCE after a SALE is deleted
CREATE TRIGGER trg_after_sale_delete
AFTER DELETE ON SALES
FOR EACH ROW
BEGIN
    UPDATE BALANCE
    SET BALANCE = BALANCE - OLD.PRICE
    WHERE ID = 1;
END //

-- Trigger to update BALANCE after an ORDER is inserted
CREATE TRIGGER trg_after_order_insert
AFTER INSERT ON ORDERS
FOR EACH ROW
BEGIN
    UPDATE BALANCE
    SET BALANCE = BALANCE - NEW.PRICE
    WHERE ID = 1;
END //

-- Trigger to update BALANCE after an ORDER is deleted
CREATE TRIGGER trg_after_order_delete
AFTER DELETE ON ORDERS
FOR EACH ROW
BEGIN
    UPDATE BALANCE
    SET BALANCE = BALANCE + OLD.PRICE
    WHERE ID = 1;
END //

-- Trigger to decrease PRODUCT QUANTITY after a SALES_PRODUCTS is inserted
CREATE TRIGGER trg_after_sales_products_insert
AFTER INSERT ON SALES_PRODUCTS
FOR EACH ROW
BEGIN
    UPDATE PRODUCTS
    SET QUANTITY = QUANTITY - NEW.QUANTITY
    WHERE ID = NEW.PRODUCTID;
END //

-- Trigger to increase PRODUCT QUANTITY after a SALES_PRODUCTS is deleted
CREATE TRIGGER trg_after_sales_products_delete
AFTER DELETE ON SALES_PRODUCTS
FOR EACH ROW
BEGIN
    UPDATE PRODUCTS
    SET QUANTITY = QUANTITY + OLD.QUANTITY
    WHERE ID = OLD.PRODUCTID;
END //

-- Trigger to increase PRODUCT QUANTITY after an ORDERS_PRODUCTS is inserted
CREATE TRIGGER trg_after_orders_products_insert
AFTER INSERT ON ORDERS_PRODUCTS
FOR EACH ROW
BEGIN
    -- Only update quantity if the associated order is COMPLETED
    IF (SELECT ORDER_STATUS FROM ORDERS WHERE ID = NEW.ORDERID) = 'COMPLETED' THEN
    UPDATE PRODUCTS
    SET QUANTITY = QUANTITY + NEW.QUANTITY
    WHERE ID = NEW.PRODUCTID;
    END IF;
END //

-- Trigger for when order status changes to COMPLETED
CREATE TRIGGER trg_after_order_status_update
AFTER UPDATE ON ORDERS
FOR EACH ROW
BEGIN
    IF NEW.ORDER_STATUS = 'COMPLETED' AND OLD.ORDER_STATUS != 'COMPLETED' THEN
        UPDATE PRODUCTS p
        JOIN ORDERS_PRODUCTS op ON p.ID = op.PRODUCTID
        SET p.QUANTITY = p.QUANTITY + op.QUANTITY
        WHERE op.ORDERID = NEW.ID;
    END IF;
END//

-- Trigger to decrease PRODUCT QUANTITY after an ORDERS_PRODUCTS is deleted
CREATE TRIGGER trg_after_orders_products_delete
AFTER DELETE ON ORDERS_PRODUCTS
FOR EACH ROW
BEGIN
    UPDATE PRODUCTS
    SET QUANTITY = QUANTITY - OLD.QUANTITY
    WHERE ID = OLD.PRODUCTID;
END //

DELIMITER ;

INSERT INTO PRODUCTS (CATEGORYID, PRODUCTNAME, PRODUCTDESCRIPTION, BRAND, PICTURE_URL, QUANTITY, REORDERLEVEL, REORDERQUANTITY, PRICE, WEIGHT) VALUES
(1, 'Apple', 'Fresh red apples', 'Brand A', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/apples.jpeg?raw=true', 100, 20, 50, 7.59, 80),
(1, 'Banana', 'Ripe bananas', 'Brand B', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/bananas.jpg?raw=true', 100, 20, 50, 2.59, 48),
(1, 'Orange', 'Juicy oranges', 'Brand C', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/oranges.jpg?raw=true', 100, 20, 50, 4.14, 48),
(1, 'Pineapple', 'Sweet pineapple', 'Brand E', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/pineapples.jpg?raw=true', 100, 20, 50, 3.29, 56),
(1, 'Strawberries', 'Sweet strawberries', 'Brand F', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/strawberries.jpg?raw=true', 100, 20, 50, 10.69, 32),
(1, 'Blackberries', 'Sweet blackberries', 'Brand G', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/blackberries.jpg?raw=true', 100, 20, 50, 10.19, 12),
(1, 'Blueberries', 'Sweet blueberries', 'Brand H', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/blueberries.jpg?raw=true', 100, 20, 50, 7.99, 18),
(1, 'Grapes', 'Tasty grapes', 'Brand I', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/grapes.jpg?raw=true', 100, 20, 50, 9.39, 48),
(1, 'Raspberries', 'Juicy raspberries', 'Brand J', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/raspberries.jpeg?raw=true', 100, 20, 50, 8.49, 12),
(1, 'Pears', 'Crunchy pears', 'Brand K', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/pears.jpg?raw=true', 100, 20, 50, 7.59, 64),
(1, 'Cherries', 'Juicy cherries', 'Brand L', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/cherries.jpeg?raw=true', 100, 20, 50, 7.98, 32),
(1, 'Mangoes', 'Sweet mangoes', 'Brand M', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/mangoes.jpeg?raw=true', 100, 20, 50, 9.19, 42);

INSERT INTO PRODUCTS (CATEGORYID, PRODUCTNAME, PRODUCTDESCRIPTION, BRAND, PICTURE_URL, QUANTITY, REORDERLEVEL, REORDERQUANTITY, PRICE, WEIGHT) VALUES
(2, 'Corn', 'Sweet corn', 'Brand A', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/corn.jpeg?raw=true', 100, 20, 50, 0.75, 2.58),
(2, 'Lettuce', 'Crunchy lettuce', 'Brand B', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/lettuce.jpeg?raw=true', 100, 20, 50, 7.59, 80),
(2, 'Tomatoes', 'Juicy tomatoes', 'Brand C', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/tomatoes.jpeg?raw=true', 100, 20, 50, 7.49, 32),
(2, 'Onions', 'Fresh onions', 'Brand E', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/onions.jpeg?raw=true', 100, 20, 50, 9.19, 160),
(2, 'Potatoes', 'Tasty potatoes', 'Brand F', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/potatoes.jpeg?raw=true', 100, 20, 50, 4.99, 160),
(2, 'Kale', 'Leafy kale', 'Brand G', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/kale.jpeg?raw=true', 100, 20, 50, 2.94, 16),
(2, 'Mushrooms', 'Tasty mushrooms', 'Brand H', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/mushrooms.jpeg?raw=true', 100, 20, 50, 6.99, 24),
(2, 'Green Beans', 'Pods of green beans', 'Brand I', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/green%20beans.jpeg?raw=true', 100, 20, 50, 6.99, 32),
(2, 'Broccoli', 'Leafy broccoli', 'Brand J', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/broccoli.jpeg?raw=true', 100, 20, 50, 6.19, 48),
(2, 'Carrots', 'Crunchy carrots', 'Brand K', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/carrots.jpeg?raw=true', 100, 20, 50, 4.26, 80),
(2, 'Cucumbers', 'Cool cucumbers', 'Brand L', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/cucumbers.jpeg?raw=true', 100, 20, 50, 7.99, 24),
(2, 'Eggplant', 'Tasty eggplant', 'Brand M', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/eggplant.jpeg?raw=true', 100, 20, 50, 2.48, 3.53);

INSERT INTO PRODUCTS (CATEGORYID, PRODUCTNAME, PRODUCTDESCRIPTION, BRAND, PICTURE_URL, QUANTITY, REORDERLEVEL, REORDERQUANTITY, PRICE, WEIGHT) VALUES
(3, 'Chicken Thighs', 'Meaty chicken thighs', 'Brand A', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/chicken%20thighs.jpeg?raw=true', 100, 20, 50, 1.89, 160),
(3, 'Chicken Breast', 'Juicy chicken breast', 'Brand B', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/chicken%20breast.jpeg?raw=true', 100, 20, 50, 3.09, 96),
(3, 'Pork Chops', 'Tasty pork chops', 'Brand C', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/pork%20chops.jpeg?raw=true', 100, 20, 50, 2.69, 96),
(3, 'Turkey Breast', 'Lean turkey breast', 'Brand E', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/turkey%20breast.jpeg?raw=true', 100, 20, 50, 5.09, 128),
(3, 'Lamb Chops', 'Tasty lamb chops', 'Brand F', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/lamb%20chops.jpeg?raw=true', 100, 20, 50, 7.14, 48),
(3, 'Bacon', 'Great cuts of bacon', 'Brand G', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/bacon.jpeg?raw=true', 100, 20, 50, 18.19, 16),
(3, 'Ham', 'Sliced cuts of ham', 'Brand H', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/ham.jpeg?raw=true', 100, 20, 50, 3.29, 144),
(3, 'Sausages', 'Freshly made sausages', 'Brand I', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/sausages.jpeg?raw=true', 100, 20, 50, 11.89, 56),
(3, 'Beef Brisket', 'Meaty beef brisket', 'Brand J', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/beef%20brisket.jpeg?raw=true', 100, 20, 50, 4.99, 224),
(3, 'Ribeye Steak', 'Whole ribeye steaks', 'Brand K', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/ribeye%20steak.jpeg?raw=true', 100, 20, 50, 16.64, 5),
(3, 'Ground Beef', 'Meaty ground beef', 'Brand L', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/ground%20beef.jpeg?raw=true', 100, 20, 50, 3.59, 160),
(3, 'Salmon Fillet', 'Fresh salmon fillet', 'Brand M', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/salmon%20fillet.jpeg?raw=true', 100, 20, 50, 39.59, 48);

INSERT INTO PRODUCTS (CATEGORYID, PRODUCTNAME, PRODUCTDESCRIPTION, BRAND, PICTURE_URL, QUANTITY, REORDERLEVEL, REORDERQUANTITY, PRICE, WEIGHT) VALUES
(4, 'Whole Milk', 'Fresh whole milk', 'Brand A', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/Whole%20milk.jpeg?raw=true', 100, 20, 50, 9.19, 128),
(4, 'Cheddar Cheese', 'Tasty cheddar cheese', 'Brand B', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/cheddar%20cheese.jpeg?raw=true', 100, 20, 50, 2.79, 40),
(4, 'Butter', 'Unsalted butter', 'Brand C', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/butter.jpeg?raw=true', 100, 20, 50, 3.83, 16),
(4, 'Yogurt', 'Tasty yogurt', 'Brand E', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/yogurt.jpeg?raw=true', 100, 20, 50, 7.29, 48),
(4, 'Cream Cheese', 'Fresh cream cheese', 'Brand F', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/cream%20cheese.jpeg?raw=true', 100, 20, 50, 10.19, 48),
(4, 'Sour Cream', 'Tubs of sour cream', 'Brand G', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/sour%20cream.jpeg?raw=true', 100, 20, 50, 10.19, 80),
(4, 'Cottage Cheese', 'Fresh cottage cheese', 'Brand H', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/cottage%20cheese.jpeg?raw=true', 100, 20, 50, 5.69, 48),
(4, 'Heavy Cream', 'Thick heavy cream', 'Brand I', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/heavy%20cream.jpeg?raw=true', 100, 20, 50, 11.69, 64),
(4, 'Whipped Cream', 'Sweet whipped cream', 'Brand J', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/whipped%20cream.jpeg?raw=true', 100, 20, 50, 2.92, 15),
(4, 'Coconut Milk', 'Fresh coconut milk', 'Brand K', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/coconut%20milk.jpeg?raw=true', 100, 20, 50, 12.39, 98),
(4, 'Kefir', 'Healthy kefir', 'Brand L', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/Kefir.jpeg?raw=true', 100, 20, 50, 7.99, 48),
(4, 'Oat Milk', 'Vegan-friendly oat milk', 'Brand M', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/oat%20milk.jpeg?raw=true', 100, 20, 50, 2.05, 32);

INSERT INTO PRODUCTS (CATEGORYID, PRODUCTNAME, PRODUCTDESCRIPTION, BRAND, PICTURE_URL, QUANTITY, REORDERLEVEL, REORDERQUANTITY, PRICE, WEIGHT) VALUES
(5, 'Potato Chips', 'Crunchy potato chips', 'Brand A', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/potato%20chips.jpeg?raw=true', 100, 20, 50, 18.59, 54),
(5, 'Pretzels', 'Tasty pretzels', 'Brand B', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/pretzels.jpeg?raw=true', 100, 20, 50, 17.39, 36),
(5, 'Beef Jerky', 'Meaty beef jerky', 'Brand C', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/beef%20jerky.jpeg?raw=true', 100, 20, 50, 12.79, 10),
(5, 'Cookies', 'Sweet cookies', 'Brand E', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/cookies.jpeg?raw=true', 100, 20, 50, 13.49, 45.6),
(5, 'Brownies', 'Crispy brownies', 'Brand F', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/brownies.jpeg?raw=true', 100, 20, 50, 8.19, 32),
(5, 'Chocolate Bars', 'Tasty chocolate bars', 'Brand G', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/chocolate%20bars.jpeg?raw=true', 100, 20, 50, 19.59, 30),
(5, 'Jelly Beans', 'Assorted jelly beans', 'Brand H', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/jelly%20beans.jpeg?raw=true', 100, 20, 50, 19.59, 64),
(5, 'Gummy Bears', 'Assorted gummy bears', 'Brand I', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/gummy%20bears.jpeg?raw=true', 100, 20, 50, 15.79, 50),
(5, 'Marshmallows', 'Soft marshmallows', 'Brand J', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/marshmallows.jpeg?raw=true', 100, 20, 50, 1.47, 10),
(5, 'Popcorn', 'Crunchy popcorn', 'Brand K', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/popcorn.jpeg?raw=true', 100, 20, 50, 19.09, 30),
(5, 'Crackers', 'Crunchy crackers', 'Brand L', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/crackers.jpeg?raw=true', 100, 20, 50, 13.99, 30),
(5, 'Peanuts', 'Healthy peanuts', 'Brand M', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/peanuts.jpeg?raw=true', 100, 20, 50, 9.29, 48);

INSERT INTO PRODUCTS (CATEGORYID, PRODUCTNAME, PRODUCTDESCRIPTION, BRAND, PICTURE_URL, QUANTITY, REORDERLEVEL, REORDERQUANTITY, PRICE, WEIGHT) VALUES
(6, 'Chicken Nuggets', 'Crispy chicken nuggets', 'Brand A', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/chicken%20nuggets.jpeg?raw=true', 100, 20, 50, 15.19, 80),
(6, 'Chicken Tikka Masala', 'Tasty chicken tikka masala', 'Brand B', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/chicken%20tikka%20masala.jpeg?raw=true', 100, 20, 50, 15.29, 30),
(6, 'Frozen Peas', 'Tasty frozen peas', 'Brand C', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/frozen%20peas.jpeg?raw=true', 100, 20, 50, 8.59, 80),
(6, 'Pad Thai', 'Tasty pad thai', 'Brand E', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/pad%20thai.jpeg?raw=true', 100, 20, 50, 6.84, 11.3),
(6, 'Fried Rice', 'Tasty fried rice', 'Brand F', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/fried%20rice.jpeg?raw=true', 100, 20, 50, 3.44, 11),
(6, 'Spaghetti', 'Tasty spaghetti', 'Brand G', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/spaghetti.jpeg?raw=true', 100, 20, 50, 22.39, 20),
(6, 'Taquitos', 'Tasty taquitos', 'Brand H', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/taquitos.jpeg?raw=true', 100, 20, 50, 15.79, 51),
(6, 'Casserole', 'Tasty casserole', 'Brand I', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/casserole.jpeg?raw=true', 100, 20, 50, 2.81, 4),
(6, 'Frozen Pizza', 'Tasty frozen pizza', 'Brand J', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/frozen%20pizza.jpeg?raw=true', 100, 20, 50, 13.29, 73),
(6, 'Frozen Salad', 'Tasty frozen salad', 'Brand K', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/frozen%20salad.jpeg?raw=true', 100, 20, 50, 13.09, 22.44),
(6, 'Lo Mein', 'Tasty lo mein', 'Brand L', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/lo%20mein.jpeg?raw=true', 100, 20, 50, 4.38, 14),
(6, 'Yakisoba', 'Tasty yakisoba', 'Brand M', 'https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/yakisoba.jpeg?raw=true', 100, 20, 50, 16.49, 54);