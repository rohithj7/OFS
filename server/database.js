import mysql from 'mysql2/promise';

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

import { geocodeAddress, getOptimizedRoute } from "./route.js";

// Helper function to execute queries
async function query(sql, params) {
    const [rows] = await pool.execute(sql, params);
    return rows;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// -------------------------------------------------------- REGISTER AND LOGIN --------------------------------------------------------------------//

// Function to get a user by ID
export async function getLoginById(id) {
    const sql = `
        SELECT * FROM LOGIN
        WHERE ID = ?
    `;
    const [result] = await pool.query(sql, [id]);
    return result.length ? result[0] : null;
}

// Function to get a user by username
export async function getLoginByEmail(email) {
    const sql = `
        SELECT * FROM LOGIN
        WHERE EMAIL = ?
    `;
    const [result] = await pool.query(sql, [email]);
    return result.length ? result[0] : null;
}

// Function to create a new user in LOGIN table
export async function createLogin(email, hashedPassword, accountCreationDate) {
    const sql = `
        INSERT INTO LOGIN (EMAIL, PASSWORD, ACCOUNTCREATIONDATE)
        VALUES (?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [email, hashedPassword, accountCreationDate]);
    return result.insertId; // Return the new user's ID
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ------------------------------------------------------------- ADMIN INFO -----------------------------------------------------------------------//

// Function to create a new entry in INFO table
export async function createUserInfo(loginId, address = null, latitude = null, longitude = null) {
    const sql = `
        INSERT INTO INFO (LOGINID, ADDRESS, LATITUDE, LONGITUDE)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [loginId, address, latitude, longitude]);
    return result.insertId; // Return the new info ID
}

export async function getUserInfo() {
    const sql = `
        SELECT * FROM INFO
    `;
    const [result] = await pool.query(sql);
    return result;
}

// Function to get user info by LOGINID
export async function getUserInfoByLoginId(loginId) {
    const sql = 'SELECT * FROM INFO WHERE LOGINID = ?';
    const [result] = await pool.query(sql, [loginId]);
    return result.length ? result[0] : null;
}

// Function to update user info
export async function updateUserInfo(loginId, address, latitude, longitude) {
    const sql = `
        UPDATE INFO SET ADDRESS = ?, LATITUDE = ?, LONGITUDE = ?
        WHERE LOGINID = ?
    `;
    const [result] = await pool.execute(sql, [address, latitude, longitude, loginId]);
    return result;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// -------------------------------------------------------------- EMPLOYEES -----------------------------------------------------------------------//

export async function createEmployee(employeeData) {
    const sql = `
      INSERT INTO EMPLOYEES (LOGINID, FIRSTNAME, LASTNAME, SSN, EMAIL, PHONE, ADDRESS, SALARY, STARTDATE, ENDDATE)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const {
        loginId,
        firstName,
        lastName,
        ssn,
        email,
        phone,
        address,
        salary,
        startDate,
        endDate
    } = employeeData;

    // Execute the query
    const [result] = await pool.query(sql, [
        loginId,
        firstName,
        lastName,
        ssn,
        email,
        phone,
        address,
        salary,
        startDate,
        endDate
    ]);

    const id = result.insertId;

    // Optionally return the newly created employee by ID
    return getEmployeeById(id);
}

export async function getEmployees() {
    const sql = `SELECT * FROM Employees`;
    const [result] = await pool.query(sql);
    return result;
}

export async function getEmployeeById(id) {
    const sql = `SELECT * FROM Employees WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result[0];
}

export async function updateEmployee(id, loginId, firstName, lastName, ssn, email, phone, address, salary, startDate, endDate) {
    const sql = `
        UPDATE Employees
        SET LOGINID = ?, FIRSTNAME = ?, LASTNAME = ?, SSN = ?, EMAIL = ?, PHONE = ?, ADDRESS = ?, SALARY = ?, STARTDATE = ?, ENDDATE = ?
        WHERE ID = ?
    `;
    const [result] = await pool.query(sql, [loginId, firstName, lastName, ssn, email, phone, address, salary, startDate, endDate, id]);
    return getEmployeeById(id)
}

export async function deleteEmployee(id) {
    const sql = `DELETE FROM Employees WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ----------------------------------------------------------- EMPLOYEE HOURS ---------------------------------------------------------------------//

export async function createEmployeeHours(employeeId, hoursWorked) {
    const sql = `
        INSERT INTO Employee_Hours (EMPLOYEEID, HOURSWORKED)
        VALUES (?, ?)
    `;
    const [result] = await pool.query(sql, [employeeId, hoursWorked]);
    const id = result.insertId;
    return getEmployeeHoursById(id);
}

export async function getEmployeeHours() {
    const sql = `SELECT * FROM Employee_Hours`;
    const [result] = await pool.query(sql);
    return result;
}

export async function getEmployeeHoursById(id) {
    const sql = `SELECT * FROM Employee_Hours WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result[0];
}

export async function updateEmployeeHours(id, employeeId, hoursWorked) {
    const sql = `
        UPDATE Employee_Hours
        SET EMPLOYEEID = ?, HOURSWORKED = ?
        WHERE ID = ?
    `;
    const [result] = await pool.query(sql, [employeeId, hoursWorked, id]);
    return getEmployeeHoursById(id);
}

export async function deleteEmployeeHours(id) {
    const sql = `DELETE FROM Employee_Hours WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// --------------------------------------------------------------- PRODUCTS -----------------------------------------------------------------------//

export async function createProduct(productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight) {
    const sql = `
        INSERT INTO PRODUCTS (PRODUCTNAME, PRODUCTDESCRIPTION, QUANTITY, REORDERLEVEL, REORDERQUANTITY, PRICE, WEIGHT)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight]);
    const id = result.insertId;
    return getProductById(id);
}

export async function getProducts() {
    const sql = `
        SELECT * FROM PRODUCTS
    `;
    const [result] = await pool.query(sql);
    return result;
}

export async function getProductById(id) {
    const sql = `
        SELECT * FROM PRODUCTS
        WHERE ID = ?
    `;
    const [result] = await pool.query(sql, [id]);
    return result[0];
}

export async function updateProduct(id, productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight) {
    const sql = `
        UPDATE PRODUCTS
        SET PRODUCTNAME = ?, PRODUCTDESCRIPTION = ?, QUANTITY = ?, REORDERLEVEL = ?, REORDERQUANTITY = ?, PRICE = ?, WEIGHT = ?
        WHERE ID = ?
    `;
    const [result] = await pool.query(sql, [productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight, id]);
    return getProductById(id);
}

export async function deleteProduct(id) {
    const sql = `
        DELETE FROM PRODUCTS
        WHERE ID = ?
    `;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
}

// Search Products by Name
export async function searchProductsByName(searchTerm) {
    const sql = `
      SELECT P.ID, P.PRODUCTNAME, P.PRODUCTDESCRIPTION, P.BRAND, P.PRICE, P.PICTURE_URL, P.QUANTITY
      FROM PRODUCTS P
      WHERE P.PRODUCTNAME LIKE ?
    `;
    const products = await query(sql, [`%${searchTerm}%`]);
    return products;
}

// Get Products by Category
export async function getProductsByCategory(categoryId) {
    const sql = `
      SELECT P.ID, P.PRODUCTNAME, P.PRODUCTDESCRIPTION, P.BRAND, P.PRICE, P.PICTURE_URL, P.QUANTITY
      FROM PRODUCTS P
      WHERE P.CATEGORYID = ?
    `;
    const products = await query(sql, [categoryId]);
    return products;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// -------------------------------------------------------------- SUPPLIERS -----------------------------------------------------------------------//

export async function createSupplier(loginId, supplierName, email, phone, address) {
    const sql = `
        INSERT INTO Suppliers (LOGINID, SUPPLIERNAME, EMAIL, PHONE, ADDRESS)
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [loginId, supplierName, email, phone, address]);
    const id = result.insertId;
    return getSupplierById(id);
}

export async function getSuppliers() {
    const sql = `SELECT * FROM Suppliers`;
    const [result] = await pool.query(sql);
    return result;
}

export async function getSupplierById(id) {
    const sql = `SELECT * FROM Suppliers WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result[0];
}

export async function updateSupplier(id, loginId, supplierName, email, phone, address) {
    const sql = `
        UPDATE Suppliers
        SET LOGINID = ?, SUPPLIERNAME = ?, EMAIL = ?, PHONE = ?, ADDRESS = ?
        WHERE ID = ?
    `;
    const [result] = await pool.query(sql, [loginId, supplierName, email, phone, address, id]);
    return getSupplierById(id);
}

export async function deleteSupplier(id) {
    const sql = `DELETE FROM Suppliers WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// -------------------------------------------------------------- CUSTOMERS -----------------------------------------------------------------------//

export async function createCustomer(
        loginId,
        firstName = null,
        lastName = null,
        phone = null,
        address = null,
        latitude = null,
        longitude = null
    ) {
    const sql = `
      INSERT INTO CUSTOMERS (LOGINID, FIRSTNAME, LASTNAME, PHONE, ADDRESS, LATITUDE, LONGITUDE)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [
        loginId,
        firstName,
        lastName,
        phone,
        address,
        latitude,
        longitude,
    ]);
    return result.insertId;
}  

export async function getCustomers() {
    const sql = `SELECT * FROM Customers`;
    const [result] = await pool.query(sql);
    return result;
}

//get customer by login id
export async function getCustomerById(loginId) {
    const sql = `SELECT * FROM CUSTOMERS WHERE LOGINID = ?`;
    const [result] = await pool.query(sql, [loginId]);
    return result[0];
}

// Update Customer Info
export async function updateCustomerInfo(loginId, customerInfo) {
    const { firstName, lastName, phone, address, latitude, longitude } = customerInfo;

    const sql = `
      UPDATE CUSTOMERS
      SET FIRSTNAME = ?, LASTNAME = ?, PHONE = ?, ADDRESS = ?, LATITUDE = ?, LONGITUDE = ?
      WHERE LOGINID = ?
    `;
    await query(sql, [
        firstName,
        lastName,
        phone,
        address,
        latitude,
        longitude,
        loginId,
    ]);
}

export async function deleteCustomer(id) {
    const sql = `DELETE FROM Customers WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ---------------------------------------------------------------- SALES -------------------------------------------------------------------------//

export async function createSale(price, saleDate, paymentDetails) {
    const sql = `INSERT INTO SALES (PRICE, SALEDATE, PAYMENTDETAILS) VALUES (?, ?, ?)`
    const [result] = await pool.query(sql, [price, saleDate, paymentDetails])
    return getSaleById(result.insertId)
}

export async function getSales() {
    const [rows] = await pool.query('SELECT * FROM SALES')
    return rows
}

// Function to get sales by customer ID
export async function getSalesByCustomerId(customerId) {
    const sql = `
      SELECT 
        S.ID AS saleId,
        S.PRICE AS totalPrice,
        S.SALEDATE AS saleDate,
        S.PAYMENTDETAILS AS paymentDetails,
        S.SALE_STATUS AS saleStatus,
        SP.PRODUCTID AS productId,
        SP.QUANTITY AS quantity,
        SP.PRICE AS productPrice,
        P.PRODUCTNAME AS productName,
        P.PICTURE_URL AS pictureUrl
      FROM SALES S
      INNER JOIN SALES_PRODUCTS SP ON S.ID = SP.SALESID
      INNER JOIN PRODUCTS P ON SP.PRODUCTID = P.ID
      WHERE S.CUSTOMERID = ?
      ORDER BY S.SALEDATE DESC, S.ID DESC
    `;
    const [rows] = await pool.execute(sql, [customerId]);

    // Organize sales and products into a structured format
    const salesMap = {};

    for (const row of rows) {
        const saleId = row.saleId;

        if (!salesMap[saleId]) {
            salesMap[saleId] = {
                saleId: row.saleId,
                totalPrice: row.totalPrice,
                saleDate: row.saleDate,
                paymentDetails: row.paymentDetails,
                saleStatus: row.saleStatus,
                products: [],
            };
        }

        salesMap[saleId].products.push({
            productId: row.productId,
            quantity: row.quantity,
            price: row.productPrice,
            productName: row.productName,
            pictureUrl: row.pictureUrl,
        });
    }

    // Convert the sales map into an array
    const sales = Object.values(salesMap);
    return sales;
}

// Check Product Availability
export async function checkProductAvailability(products) {
    const unavailableProducts = [];

    for (const { productId, quantity } of products) {
        const sql = `
            SELECT QUANTITY FROM PRODUCTS
            WHERE ID = ?
        `;
        const [product] = await query(sql, [productId]);

        if (!product || product.QUANTITY < quantity) {
            unavailableProducts.push({ productId, availableQuantity: product ? product.QUANTITY : 0 });
        }
    }

    return unavailableProducts;
}

// Place Sale
export async function placeSale(customerId, products) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Insert into SALES table
        const saleSql = `
            INSERT INTO SALES (CUSTOMERID, PRICE, SALEDATE, PAYMENTDETAILS, SALE_STATUS)
            VALUES (?, ?, ?, ?, ?)
        `;
        const totalPrice = await calculateTotalPrice(products);
        const saleDate = new Date().toISOString().slice(0, 10);
        const paymentDetails = 'Paid via Stripe'; // Placeholder
        const saleStatus = 'COMPLETED';

        const [saleResult] = await connection.execute(saleSql, [
            customerId,
            totalPrice,
            saleDate,
            paymentDetails,
            saleStatus,
        ]);

        const saleId = saleResult.insertId;

        // Insert into SALES_PRODUCTS table
        const saleProductSql = `
            INSERT INTO SALES_PRODUCTS (SALESID, PRODUCTID, QUANTITY, PRICE)
            VALUES (?, ?, ?, ?)
        `;

        for (const { productId, quantity } of products) {
            const productPrice = await getProductPrice(productId);
            const price = productPrice * quantity;
            await connection.execute(saleProductSql, [saleId, productId, quantity, price]);
        }

        await connection.commit();
        return { saleId, totalPrice };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

// Helper function to calculate total price
async function calculateTotalPrice(products) {
    let totalPrice = 0;
    for (const { productId, quantity } of products) {
        const price = await getProductPrice(productId);
        totalPrice += price * quantity;
    }
    return totalPrice;
}

// Helper function to get product price
async function getProductPrice(productId) {
    const sql = `
        SELECT PRICE FROM PRODUCTS
        WHERE ID = ?
    `;
    const [product] = await query(sql, [productId]);
    return product ? product.PRICE : 0;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ------------------------------------------------------------ SALES PRODUCTS --------------------------------------------------------------------//

export async function createSalesProduct(salesId, productId, quantity, price) {
    const sql = `INSERT INTO SALES_PRODUCTS (SALESID, PRODUCTID, QUANTITY, PRICE) VALUES (?, ?, ?, ?)`
    const [result] = await pool.query(sql, [salesId, productId, quantity, price])
    return getSalesProductById(result.insertId)
}

export async function getSalesProducts() {
    const [rows] = await pool.query('SELECT * FROM SALES_PRODUCTS')
    return rows
}

export async function getSalesProductById(id) {
    const [rows] = await pool.query('SELECT * FROM SALES_PRODUCTS WHERE ID = ?', [id])
    return rows[0]
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ---------------------------------------------------------------- ORDERS ------------------------------------------------------------------------//

// Get Orders by Login ID
export async function getOrdersByLoginId(loginId) {
    const sql = `
      SELECT S.ID AS saleId, S.PRICE AS totalPrice, S.SALEDATE, S.SALE_STATUS,
             SP.PRODUCTID, SP.QUANTITY, SP.PRICE AS productPrice,
             P.PRODUCTNAME
      FROM SALES S
      INNER JOIN CUSTOMERS C ON S.CUSTOMERID = C.ID
      INNER JOIN SALES_PRODUCTS SP ON S.ID = SP.SALESID
      INNER JOIN PRODUCTS P ON SP.PRODUCTID = P.ID
      WHERE C.LOGINID = ?
      ORDER BY S.SALEDATE DESC
    `;
    const rows = await query(sql, [loginId]);
    return rows;
}

export async function createOrder(price, orderDate, paymentDetails) {
    const sql = `INSERT INTO ORDERS (PRICE, ORDERDATE, PAYMENTDETAILS) VALUES (?, ?, ?)`
    const [result] = await pool.query(sql, [price, orderDate, paymentDetails])
    return getOrderById(result.insertId)
}

export async function getOrders() {
    const [rows] = await pool.query('SELECT * FROM ORDERS')
    return rows
}

export async function getOrderById(id) {
    const [rows] = await pool.query('SELECT * FROM ORDERS WHERE ID = ?', [id])
    return rows[0]
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ------------------------------------------------------------ ORDERS PORODUCTS ------------------------------------------------------------------//

export async function createOrderProduct(orderId, productId, quantity, price) {
    const sql = `INSERT INTO ORDERS_PRODUCTS (ORDERID, PRODUCTID, QUANTITY, PRICE) VALUES (?, ?, ?, ?)`
    const [result] = await pool.query(sql, [orderId, productId, quantity, price])
    return getOrderProductById(result.insertId)
}

export async function getOrdersProducts() {
    const [rows] = await pool.query('SELECT * FROM ORDERS_PRODUCTS')
    return rows
}

export async function getOrderProductById(id) {
    const [rows] = await pool.query('SELECT * FROM ORDERS_PRODUCTS WHERE ID = ?', [id])
    return rows[0]
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ---------------------------------------------------------------- BALANCE -----------------------------------------------------------------------//

export async function getBalance() {
    const [rows] = await pool.query('SELECT * FROM BALANCE ORDER BY TIMESTAMP DESC LIMIT 1')
    return rows[0]
}

export async function storeBalance(balance) {
    const sql = `INSERT INTO BALANCE (BALANCE) VALUES (?)`
    const [result] = await pool.query(sql, [balance])
    return result.insertId
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ---------------------------------------------------------------- MAPBOX ------------------------------------------------------------------------//

// Starting coordinates locked in for now on school coords
const START_LAT = 37.337214;
const START_LNG = -121.882696;

export async function planDeliveryRoute() {
    const startCoord = { latitude: START_LAT, longitude: START_LNG };

    const deliveryAddresses = [
        '1016 Johnson Ave, San Jose, CA 95129',
        '2430 Newhall St, San Jose, CA 95128',
        // Add more addresses
    ];

    const deliveryCoords = [];
    for (const address of deliveryAddresses) {
        const coord = await geocodeAddress(address);
        deliveryCoords.push(coord);
    }

    const routeData = await getOptimizedRoute(startCoord, deliveryCoords);

    return routeData;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ---------------------------------------------------------------- STUFF -------------------------------------------------------------------------//
export default pool;