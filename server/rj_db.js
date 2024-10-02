
async function createLogin(username, password) {
    const sql = 'INSERT INTO LOGIN (USERNAME, PASSWORD, ACCOUNTCREATIONDATE) VALUES (?, ?, CURDATE())';
    return await query(sql, [username, password]);
}

async function getLogin(username) {
    const sql = 'SELECT * FROM LOGIN WHERE USERNAME = ?';
    return await query(sql, [username]);
}


async function getCustomers() {
    const sql = 'SELECT * FROM CUSTOMERS';
    return await query(sql);
}

async function addCustomer(loginId, firstName, lastName, email, phone, address, latitude, longitude) {
    const sql = 'INSERT INTO CUSTOMERS (LOGINID, FIRSTNAME, LASTNAME, EMAIL, PHONE, ADDRESS, LATITUDE, LONGITUDE) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    return await query(sql, [loginId, firstName, lastName, email, phone, address, latitude, longitude]);
}

async function updateCustomer(id, firstName, lastName, email, phone, address, latitude, longitude) {
    const sql = 'UPDATE CUSTOMERS SET FIRSTNAME = ?, LASTNAME = ?, EMAIL = ?, PHONE = ?, ADDRESS = ?, LATITUDE = ?, LONGITUDE = ? WHERE ID = ?';
    return await query(sql, [firstName, lastName, email, phone, address, latitude, longitude, id]);
}


async function getProducts() {
    const sql = 'SELECT * FROM PRODUCTS';
    return await query(sql);
}

async function addProduct(name, description, quantity, reorderLevel, reorderQuantity, price, weight) {
    const sql = 'INSERT INTO PRODUCTS (PRODUCTNAME, PRODUCTDESCRIPTION, QUANTITY, REORDERLEVEL, REORDERQUANTITY, PRICE, WEIGHT) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return await query(sql, [name, description, quantity, reorderLevel, reorderQuantity, price, weight]);
}

async function updateProduct(id, name, description, quantity, reorderLevel, reorderQuantity, price, weight) {
    const sql = 'UPDATE PRODUCTS SET PRODUCTNAME = ?, PRODUCTDESCRIPTION = ?, QUANTITY = ?, REORDERLEVEL = ?, REORDERQUANTITY = ?, PRICE = ?, WEIGHT = ? WHERE ID = ?';
    return await query(sql, [name, description, quantity, reorderLevel, reorderQuantity, price, weight, id]);
}


async function createOrder(price, paymentDetails) {
    const sql = 'INSERT INTO ORDERS (PRICE, ORDERDATE, PAYMENTDETAILS) VALUES (?, CURDATE(), ?)';
    return await query(sql, [price, paymentDetails]);
}

async function addOrderProduct(orderId, productId, quantity, price) {
    const sql = 'INSERT INTO ORDERS_PRODUCTS (ORDERID, PRODUCTID, QUANTITY, PRICE) VALUES (?, ?, ?, ?)';
    return await query(sql, [orderId, productId, quantity, price]);
}


async function getBalance() {
    const sql = 'SELECT * FROM BALANCE ORDER BY TIMESTAMP DESC LIMIT 1';
    return await query(sql);
}

async function storeBalance(balance) {
    const sql = 'INSERT INTO BALANCE (BALANCE) VALUES (?)';
    return await query(sql, [balance]);
}


async function addEmployee(loginId, firstName, lastName, ssn, email, phone, address, salary, startDate) {
    const sql = 'INSERT INTO EMPLOYEES (LOGINID, FIRSTNAME, LASTNAME, SSN, EMAIL, PHONE, ADDRESS, SALARY, STARTDATE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return await query(sql, [loginId, firstName, lastName, ssn, email, phone, address, salary, startDate]);
}

async function updateEmployeeHours(employeeId, hoursWorked) {
    const sql = 'INSERT INTO EMPLOYEE_HOURS (EMPLOYEEID, HOURSWORKED) VALUES (?, ?)';
    return await query(sql, [employeeId, hoursWorked]);
}


async function addSupplier(loginId, supplierName, email, phone, address) {
    const sql = 'INSERT INTO SUPPLIERS (LOGINID, SUPPLIERNAME, EMAIL, PHONE, ADDRESS) VALUES (?, ?, ?, ?, ?)';
    return await query(sql, [loginId, supplierName, email, phone, address]);
}

module.exports = {
    createLogin,
    getLogin,
    getCustomers,
    addCustomer,
    updateCustomer,
    getProducts,
    addProduct,
    updateProduct,
    createOrder,
    addOrderProduct,
    getBalance,
    storeBalance,
    addEmployee,
    updateEmployeeHours,
    addSupplier
};