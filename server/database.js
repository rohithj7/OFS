import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '.env') })

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

// LOGIN functions
export async function createLogin(username, password) {
  const sql = `INSERT INTO LOGIN (USERNAME, PASSWORD, ACCOUNTCREATIONDATE) VALUES (?, ?, CURDATE())`
  const [result] = await pool.query(sql, [username, password])
  return result.insertId
}

export async function getLogin(username) {
  const sql = `SELECT * FROM LOGIN WHERE USERNAME = ?`
  const [rows] = await pool.query(sql, [username])
  return rows[0]
}

// INFO functions
export async function createGeneralInfo(loginId, address, latitude, longitude) {
  const sql = `INSERT INTO INFO (LOGINID, ADDRESS, LATITUDE, LONGITUDE) VALUES (?, ?, ?, ?)`
  const [result] = await pool.query(sql, [loginId, address, latitude, longitude])
  return getGeneralInfoById(result.insertId)
}

export async function getGeneralInfo() {
  const [rows] = await pool.query('SELECT * FROM INFO')
  return rows
}

export async function getGeneralInfoById(id) {
  const [rows] = await pool.query('SELECT * FROM INFO WHERE ID = ?', [id])
  return rows[0]
}

export async function updateGeneralInfo(id, loginId, address, latitude, longitude) {
  const sql = `UPDATE INFO SET LOGINID = ?, ADDRESS = ?, LATITUDE = ?, LONGITUDE = ? WHERE ID = ?`
  await pool.query(sql, [loginId, address, latitude, longitude, id])
  return getGeneralInfoById(id)
}

export async function deleteGeneralInfo(id) {
  const [result] = await pool.query('DELETE FROM INFO WHERE ID = ?', [id])
  return result.affectedRows > 0
}

// EMPLOYEES functions
export async function createEmployee(loginId, firstName, lastName, ssn, email, phone, address, salary, startDate, endDate) {
  const sql = `INSERT INTO EMPLOYEES (LOGINID, FIRSTNAME, LASTNAME, SSN, EMAIL, PHONE, ADDRESS, SALARY, STARTDATE, ENDDATE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  const [result] = await pool.query(sql, [loginId, firstName, lastName, ssn, email, phone, address, salary, startDate, endDate])
  return getEmployeeById(result.insertId)
}

export async function getEmployees() {
  const [rows] = await pool.query('SELECT * FROM EMPLOYEES')
  return rows
}

export async function getEmployeeById(id) {
  const [rows] = await pool.query('SELECT * FROM EMPLOYEES WHERE ID = ?', [id])
  return rows[0]
}

export async function updateEmployee(id, loginId, firstName, lastName, ssn, email, phone, address, salary, startDate, endDate) {
  const sql = `UPDATE EMPLOYEES SET LOGINID = ?, FIRSTNAME = ?, LASTNAME = ?, SSN = ?, EMAIL = ?, PHONE = ?, ADDRESS = ?, SALARY = ?, STARTDATE = ?, ENDDATE = ? WHERE ID = ?`
  await pool.query(sql, [loginId, firstName, lastName, ssn, email, phone, address, salary, startDate, endDate, id])
  return getEmployeeById(id)
}

export async function deleteEmployee(id) {
  const [result] = await pool.query('DELETE FROM EMPLOYEES WHERE ID = ?', [id])
  return result.affectedRows > 0
}

// EMPLOYEE_HOURS functions
export async function createEmployeeHours(employeeId, hoursWorked) {
  const sql = `INSERT INTO EMPLOYEE_HOURS (EMPLOYEEID, HOURSWORKED) VALUES (?, ?)`
  const [result] = await pool.query(sql, [employeeId, hoursWorked])
  return getEmployeeHoursById(result.insertId)
}

export async function getEmployeeHours() {
  const [rows] = await pool.query('SELECT * FROM EMPLOYEE_HOURS')
  return rows
}

export async function getEmployeeHoursById(id) {
  const [rows] = await pool.query('SELECT * FROM EMPLOYEE_HOURS WHERE ID = ?', [id])
  return rows[0]
}

export async function updateEmployeeHours(id, employeeId, hoursWorked) {
  const sql = `UPDATE EMPLOYEE_HOURS SET EMPLOYEEID = ?, HOURSWORKED = ? WHERE ID = ?`
  await pool.query(sql, [employeeId, hoursWorked, id])
  return getEmployeeHoursById(id)
}

export async function deleteEmployeeHours(id) {
  const [result] = await pool.query('DELETE FROM EMPLOYEE_HOURS WHERE ID = ?', [id])
  return result.affectedRows > 0
}

// PRODUCTS functions
export async function createProduct(productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight) {
  const sql = `INSERT INTO PRODUCTS (PRODUCTNAME, PRODUCTDESCRIPTION, QUANTITY, REORDERLEVEL, REORDERQUANTITY, PRICE, WEIGHT) VALUES (?, ?, ?, ?, ?, ?, ?)`
  const [result] = await pool.query(sql, [productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight])
  return getProductById(result.insertId)
}

export async function getProducts() {
  const [rows] = await pool.query('SELECT * FROM PRODUCTS')
  return rows
}

export async function getProductById(id) {
  const [rows] = await pool.query('SELECT * FROM PRODUCTS WHERE ID = ?', [id])
  return rows[0]
}

export async function updateProduct(id, productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight) {
  const sql = `UPDATE PRODUCTS SET PRODUCTNAME = ?, PRODUCTDESCRIPTION = ?, QUANTITY = ?, REORDERLEVEL = ?, REORDERQUANTITY = ?, PRICE = ?, WEIGHT = ? WHERE ID = ?`
  await pool.query(sql, [productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight, id])
  return getProductById(id)
}

export async function deleteProduct(id) {
  const [result] = await pool.query('DELETE FROM PRODUCTS WHERE ID = ?', [id])
  return result.affectedRows > 0
}

// SUPPLIERS functions
export async function createSupplier(loginId, supplierName, email, phone, address) {
  const sql = `INSERT INTO SUPPLIERS (LOGINID, SUPPLIERNAME, EMAIL, PHONE, ADDRESS) VALUES (?, ?, ?, ?, ?)`
  const [result] = await pool.query(sql, [loginId, supplierName, email, phone, address])
  return getSupplierById(result.insertId)
}

export async function getSuppliers() {
  const [rows] = await pool.query('SELECT * FROM SUPPLIERS')
  return rows
}

export async function getSupplierById(id) {
  const [rows] = await pool.query('SELECT * FROM SUPPLIERS WHERE ID = ?', [id])
  return rows[0]
}

export async function updateSupplier(id, loginId, supplierName, email, phone, address) {
  const sql = `UPDATE SUPPLIERS SET LOGINID = ?, SUPPLIERNAME = ?, EMAIL = ?, PHONE = ?, ADDRESS = ? WHERE ID = ?`
  await pool.query(sql, [loginId, supplierName, email, phone, address, id])
  return getSupplierById(id)
}

export async function deleteSupplier(id) {
  const [result] = await pool.query('DELETE FROM SUPPLIERS WHERE ID = ?', [id])
  return result.affectedRows > 0
}

// CUSTOMERS functions
export async function createCustomer(loginId, firstName, lastName, email, phone, address, latitude, longitude) {
  const sql = `INSERT INTO CUSTOMERS (LOGINID, FIRSTNAME, LASTNAME, EMAIL, PHONE, ADDRESS, LATITUDE, LONGITUDE) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  const [result] = await pool.query(sql, [loginId, firstName, lastName, email, phone, address, latitude, longitude])
  return getCustomerById(result.insertId)
}

export async function getCustomers() {
  const [rows] = await pool.query('SELECT * FROM CUSTOMERS')
  return rows
}

export async function getCustomerById(id) {
  const [rows] = await pool.query('SELECT * FROM CUSTOMERS WHERE ID = ?', [id])
  return rows[0]
}

export async function updateCustomer(id, loginId, firstName, lastName, email, phone, address, latitude, longitude) {
  const sql = `UPDATE CUSTOMERS SET LOGINID = ?, FIRSTNAME = ?, LASTNAME = ?, EMAIL = ?, PHONE = ?, ADDRESS = ?, LATITUDE = ?, LONGITUDE = ? WHERE ID = ?`
  await pool.query(sql, [loginId, firstName, lastName, email, phone, address, latitude, longitude, id])
  return getCustomerById(id)
}

export async function deleteCustomer(id) {
  const [result] = await pool.query('DELETE FROM CUSTOMERS WHERE ID = ?', [id])
  return result.affectedRows > 0
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

export {
  // LOGIN functions
  createLogin,
  getLogin,

  // INFO functions
  createGeneralInfo,
  getGeneralInfo,
  getGeneralInfoById,
  updateGeneralInfo,
  deleteGeneralInfo,

  // EMPLOYEES functions
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,

  // EMPLOYEE_HOURS functions
  createEmployeeHours,
  getEmployeeHours,
  getEmployeeHoursById,
  updateEmployeeHours,
  deleteEmployeeHours,

  // PRODUCTS functions
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,

  // SUPPLIERS functions
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,

  // CUSTOMERS functions
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,

  // BALANCE functions
  getBalance,
  storeBalance
}