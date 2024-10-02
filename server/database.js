import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// GENERAL INFO //
/*
createGeneralInfo
getGeneralInfo
getGeneralInfoById
updateGeneralInfo
deleteGeneralInfo
*/
export async function createGeneralInfo(loginId, address, latitude, longitude) {
    const sql = `
        INSERT INTO INFO (LOGINID, ADDRESS, LATITUDE, LONGITUDE)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [loginId, address, latitude, longitude]);
    const id = result.insertId;
    return getGeneralInfoById(id);
}

export async function getGeneralInfo() {
    const sql = `SELECT * FROM INFO`;
    const [result] = await pool.query(sql);
    return result;
}

export async function getGeneralInfoById(id) {
    const sql = `SELECT * FROM INFO WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result[0];
}

export async function updateGeneralInfo(id, loginId, address, latitude, longitude) {
    const sql = `
        UPDATE INFO
        SET LOGINID = ?, ADDRESS = ?, LATITUDE = ?, LONGITUDE = ?
        WHERE ID = ?
    `;
    const [result] = await pool.query(sql, [loginId, address, latitude, longitude, id]);
    return getGeneralInfoById(id);
}

export async function deleteGeneralInfo(id) {
    const sql = `DELETE FROM INFO WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
}

// EMPLOYEES //
/*
createEmployee()
getEmployees
getEmployeeById
updateEmployee
deleteEmployee
*/
export async function createEmployee(loginId, firstName, lastName, ssn, email, phone, address, salary, startDate, endDate) {
    const sql = `
        INSERT INTO Employees (LOGINID, FIRSTNAME, LASTNAME, SSN, EMAIL, PHONE, ADDRESS, SALARY, STARTDATE, ENDDATE)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [loginId, firstName, lastName, ssn, email, phone, address, salary, startDate, endDate]);
    const id = result.insertId;
    return getEmployeeById(id);
}

export async function getEmployees(){
    const sql = `SELECT * FROM Employees`;
    const [result] = await pool.query(sql);
    return result;
}

export async function getEmployeeById(id){
    const sql = `SELECT * FROM Employees WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result[0];
}

export async function updateEmployee(id, loginId, firstName, lastName, ssn, email, phone, address, salary, startDate, endDate){
    const sql = `
        UPDATE Employees
        SET LOGINID = ?, FIRSTNAME = ?, LASTNAME = ?, SSN = ?, EMAIL = ?, PHONE = ?, ADDRESS = ?, SALARY = ?, STARTDATE = ?, ENDDATE = ?
        WHERE ID = ?
    `;
    const [result] = await pool.query(sql, [loginId, firstName, lastName, ssn, email, phone, address, salary, startDate, endDate, id]);
    return getEmployeeById(id)
}

export async function deleteEmployee(id){
    const sql = `DELETE FROM Employees WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
}

//EMPLOYEE_HOURS//
/*
createEmployeeHours
getEmployeeHours
getEmployeeHoursById
updateEmployeeHours
deleteEmployeeHours
*/
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

//PRODUCTS//
/*
createProduct
getProducts
getProductById
updateProduct
deleteProduct
*/
export async function createProduct(productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight) {
    const sql = `
        INSERT INTO Products (PRODUCTNAME, PRODUCTDESCRIPTION, QUANTITY, REORDERLEVEL, REORDERQUANTITY, PRICE, WEIGHT)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight]);
    const id = result.insertId;
    return getProductById(id);
}

export async function getProducts() {
    const sql = `SELECT * FROM Products`;
    const [result] = await pool.query(sql);
    return result;
}

export async function getProductById(id) {
    const sql = `SELECT * FROM Products WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result[0];
}

export async function updateProduct(id, productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight) {
    const sql = `
        UPDATE Products
        SET PRODUCTNAME = ?, PRODUCTDESCRIPTION = ?, QUANTITY = ?, REORDERLEVEL = ?, REORDERQUANTITY = ?, PRICE = ?, WEIGHT = ?
        WHERE ID = ?
    `;
    const [result] = await pool.query(sql, [productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight, id]);
    return getProductById(id);
}

export async function deleteProduct(id) {
    const sql = `DELETE FROM Products WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
}

//SUPPLIERS//
/*
createSupplier
getSuppliers
getSupplierById
updateSupplier
deleteSupplier
*/
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

//CUSTOMERS//
/*
createCustomer
getCustomers
getCustomerById
updateCustomer
deleteCustomer
*/
export async function createCustomer(loginId, firstName, lastName, email, phone, address, latitude, longitude) {
    const sql = `
        INSERT INTO Customers (LOGINID, FIRSTNAME, LASTNAME, EMAIL, PHONE, ADDRESS, LATITUDE, LONGITUDE)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [loginId, firstName, lastName, email, phone, address, latitude, longitude]);
    const id = result.insertId;
    return getCustomerById(id);
}

export async function getCustomers() {
    const sql = `SELECT * FROM Customers`;
    const [result] = await pool.query(sql);
    return result;
}

export async function getCustomerById(id) {
    const sql = `SELECT * FROM Customers WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result[0];
}

export async function updateCustomer(id, loginId, firstName, lastName, email, phone, address, latitude, longitude) {
    const sql = `
        UPDATE Customers
        SET LOGINID = ?, FIRSTNAME = ?, LASTNAME = ?, EMAIL = ?, PHONE = ?, ADDRESS = ?, LATITUDE = ?, LONGITUDE = ?
        WHERE ID = ?
    `;
    const [result] = await pool.query(sql, [loginId, firstName, lastName, email, phone, address, latitude, longitude, id]);
    return getCustomerById(id);
}

export async function deleteCustomer(id) {
    const sql = `DELETE FROM Customers WHERE ID = ?`;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0;
}

// BALANCE functions
export async function getBalance() {
  const [rows] = await pool.query('SELECT * FROM BALANCE ORDER BY TIMESTAMP DESC LIMIT 1')
  return rows[0]
}

export async function storeBalance(balance) {
  const sql = `INSERT INTO BALANCE (BALANCE) VALUES (?)`
  const [result] = await pool.query(sql, [balance])
  return result.insertId
}