import mysql from "mysql2/promise";

import dotenv from "dotenv";
dotenv.config();

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
export async function createLogin(
  email,
  hashedPassword,
  accountCreationDate,
  role = "customer"
) {
  const sql = `
        INSERT INTO LOGIN (EMAIL, PASSWORD, ACCOUNTCREATIONDATE, ROLE, FIRST_TIME_LOGIN)
        VALUES (?, ?, ?, ?, ?)
    `;
  const [result] = await pool.execute(sql, [
    email,
    hashedPassword,
    accountCreationDate,
    role,
    true, // Set FIRST_TIME_LOGIN to true for new users
  ]);
  return result.insertId; // Return the new user's ID
}

// Function to reset password
export async function resetPassword(userId, hashedPassword) {
  const sql = `
        UPDATE LOGIN
        SET PASSWORD = ?
        WHERE ID = ?
    `;
  const [result] = await pool.query(sql, [hashedPassword, userId]);
  return result.affectedRows > 0;
}

// Function to get the count of admins
export async function getAdminCount() {
  const sql = `
        SELECT COUNT(*) AS count FROM LOGIN
        WHERE ROLE = 'admin'
    `;
  const [result] = await pool.query(sql);
  return result[0].count;
}

// Function to update the first time login flag
export async function updateFirstTimeLogin(userId, firstTimeLogin) {
  const sql = `
        UPDATE LOGIN
        SET FIRST_TIME_LOGIN = ?
        WHERE ID = ?
    `;
  const [result] = await pool.query(sql, [firstTimeLogin, userId]);
  return result.affectedRows > 0;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ------------------------------------------------------------- ADMIN INFO -----------------------------------------------------------------------//

// Function to create a new entry in INFO table
export async function createUserInfo(
  loginId,
  address = null,
  latitude = null,
  longitude = null
) {
  const sql = `
        INSERT INTO INFO (LOGINID, ADDRESS, LATITUDE, LONGITUDE)
        VALUES (?, ?, ?, ?)
    `;
  const [result] = await pool.execute(sql, [
    loginId,
    address,
    latitude,
    longitude,
  ]);
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
  const sql = "SELECT * FROM INFO WHERE LOGINID = ?";
  const [result] = await pool.query(sql, [loginId]);
  return result.length ? result[0] : null;
}

// Function to update user info
export async function updateUserInfo(loginId, address, latitude, longitude) {
  const sql = `
        UPDATE INFO SET ADDRESS = ?, LATITUDE = ?, LONGITUDE = ?
        WHERE LOGINID = ?
    `;
  const [result] = await pool.execute(sql, [
    address,
    latitude,
    longitude,
    loginId,
  ]);
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
    endDate,
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
    endDate,
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

export async function updateEmployee(
  id,
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
) {
  const sql = `
        UPDATE Employees
        SET LOGINID = ?, FIRSTNAME = ?, LASTNAME = ?, SSN = ?, EMAIL = ?, PHONE = ?, ADDRESS = ?, SALARY = ?, STARTDATE = ?, ENDDATE = ?
        WHERE ID = ?
    `;
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
    endDate,
    id,
  ]);
  return getEmployeeById(id);
}

export async function deleteEmployee(id) {
  const sql = `DELETE FROM Employees WHERE ID = ?`;
  const [result] = await pool.query(sql, [id]);
  return result.affectedRows > 0;
}

// Function to get an employee by SSN
export async function getEmployeeBySSN(ssn) {
  const sql = `
        SELECT * FROM EMPLOYEES
        WHERE SSN = ?
    `;
  const [result] = await pool.query(sql, [ssn]);
  return result.length ? result[0] : null;
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

export async function createProduct(
  categoryId,
  productName,
  productDescription,
  brand,
  pictureUrl,
  quantity,
  reorderLevel,
  reorderQuantity,
  price,
  weight
) {
  console.log("Creating product with values:", {
    categoryId,
    productName,
    productDescription,
    brand,
    pictureUrl,
    quantity,
    reorderLevel,
    reorderQuantity,
    price,
    weight,
  });

  const sql = `
    INSERT INTO PRODUCTS (
      CATEGORYID,
      PRODUCTNAME, 
      PRODUCTDESCRIPTION, 
      BRAND,
      PICTURE_URL,
      QUANTITY, 
      REORDERLEVEL, 
      REORDERQUANTITY, 
      PRICE, 
      WEIGHT
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    // Make sure values are in the same order as columns
    const [result] = await pool.query(sql, [
      categoryId,
      productName,
      productDescription,
      brand,
      pictureUrl,
      quantity,
      reorderLevel,
      reorderQuantity,
      price,
      weight,
    ]);

    console.log("Insert result:", result);
    const id = result.insertId;
    const product = await getProductById(id);
    console.log("Created product:", product);
    return product;
  } catch (error) {
    console.error("Error in createProduct:", error);
    throw error;
  }
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

export async function updateProduct(
  id,
  {
    categoryId,
    productName,
    productDescription,
    brand,
    pictureUrl,
    quantity,
    reorderLevel,
    reorderQuantity,
    price,
    weight,
  }
) {
  const sql = `
    UPDATE PRODUCTS
    SET 
      CATEGORYID = ?,
      PRODUCTNAME = ?, 
      PRODUCTDESCRIPTION = ?, 
      BRAND = ?,
      PICTURE_URL = ?,
      QUANTITY = ?, 
      REORDERLEVEL = ?, 
      REORDERQUANTITY = ?, 
      PRICE = ?,
      WEIGHT = ?
    WHERE ID = ?
  `;

  const [result] = await pool.query(sql, [
    categoryId,
    productName,
    productDescription,
    brand,
    pictureUrl,
    quantity,
    reorderLevel,
    reorderQuantity,
    price,
    weight,
    id,
  ]);

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
      SELECT P.ID, P.CATEGORYID, P.PRODUCTNAME, P.PRODUCTDESCRIPTION, P.BRAND, P.PRICE, P.PICTURE_URL, P.QUANTITY, P.WEIGHT
      FROM PRODUCTS P
      WHERE P.PRODUCTNAME LIKE ?
    `;
  const products = await query(sql, [`%${searchTerm}%`]);
  return products;
}

// Get Products by Category
export async function getProductsByCategory(categoryId) {
  const sql = `
      SELECT P.ID, P.CATEGORYID, P.PRODUCTNAME, P.PRODUCTDESCRIPTION, P.BRAND, P.PRICE, P.PICTURE_URL, P.QUANTITY, P.WEIGHT
      FROM PRODUCTS P
      WHERE P.CATEGORYID = ?
    `;
  const products = await query(sql, [categoryId]);
  return products;
}
// Function to get products with quantities less than their reorder levels
export async function getProductsBelowReorderLevel() {
  const sql = `
    SELECT ID, PRODUCTNAME
    FROM PRODUCTS
    WHERE QUANTITY < REORDERLEVEL
  `;
  const [result] = await pool.query(sql);
  return result;
}

// Function to reorder products with quantities less than their reorder levels by a specified quantity
// Function to reorder products
export async function reorderProduct(productId, supplierId, quantity = null) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Get product details
    const productSql = `SELECT REORDERQUANTITY, PRICE FROM PRODUCTS WHERE ID = ?`;
    const [product] = await connection.query(productSql, [productId]);
    if (!product.length) {
      throw new Error("Product not found");
    }

    const reorderQuantity = quantity || product[0].REORDERQUANTITY;
    const price = product[0].PRICE * reorderQuantity;

    // Insert into ORDERS table
    const orderSql = `
      INSERT INTO ORDERS (PRICE, ORDERDATE, PAYMENTDETAILS, SUPPLIERID, ORDER_STATUS)
      VALUES (?, ?, ?, ?, ?)
    `;
    const orderDate = new Date().toISOString().slice(0, 10);
    const paymentDetails = "Paid"; // Placeholder
    const orderStatus = "NOT STARTED";

    const [orderResult] = await connection.query(orderSql, [
      price,
      orderDate,
      paymentDetails,
      supplierId,
      orderStatus,
    ]);

    const orderId = orderResult.insertId;

    // Insert into ORDERS_PRODUCTS table
    const orderProductSql = `
      INSERT INTO ORDERS_PRODUCTS (ORDERID, PRODUCTID, QUANTITY, PRICE)
      VALUES (?, ?, ?, ?)
    `;
    await connection.query(orderProductSql, [
      orderId,
      productId,
      reorderQuantity,
      price,
    ]);

    await connection.commit();
    return { orderId, reorderQuantity, price };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

// Function to get product ID by product name
export async function getProductIdByName(productName) {
  const sql = `SELECT ID FROM PRODUCTS WHERE PRODUCTNAME = ?`;
  const [result] = await pool.query(sql, [productName]);
  return result.length ? result[0].ID : null;
}

// Function to get supplier ID by supplier name
export async function getSupplierIdByName(supplierName) {
  const sql = `SELECT ID FROM SUPPLIERS WHERE SUPPLIERNAME = ?`;
  const [result] = await pool.query(sql, [supplierName]);
  return result.length ? result[0].ID : null;
}

export async function getOrdersWithDetailsBySupplier(loginId) {
  const sql = `
    SELECT 
      O.ID as orderId,
      O.ORDERDATE,
      O.ORDER_STATUS,
      OP.QUANTITY,
      OP.PRICE as productPrice,
      OP.PRODUCTID as productId,
      P.PRODUCTNAME,
      P.BRAND,
      P.PICTURE_URL,
      P.PRICE as pricePerUnit,
      P.WEIGHT as weightPerUnit,
      S.SUPPLIERNAME
    FROM ORDERS O
    JOIN SUPPLIERS S ON O.SUPPLIERID = S.ID
    JOIN ORDERS_PRODUCTS OP ON O.ID = OP.ORDERID
    JOIN PRODUCTS P ON OP.PRODUCTID = P.ID
    WHERE S.LOGINID = ?
    ORDER BY O.ORDERDATE DESC`;

  const [rows] = await pool.query(sql, [loginId]);
  return rows;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// -------------------------------------------------------------- SUPPLIERS -----------------------------------------------------------------------//

export async function createSupplier(
  loginId,
  supplierName,
  email,
  phone,
  address
) {
  const sql = `
        INSERT INTO Suppliers (LOGINID, SUPPLIERNAME, EMAIL, PHONE, ADDRESS)
        VALUES (?, ?, ?, ?, ?)
    `;
  const [result] = await pool.query(sql, [
    loginId,
    supplierName,
    email,
    phone,
    address,
  ]);
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

export async function updateSupplier(
  id,
  loginId,
  supplierName,
  email,
  phone,
  address
) {
  const sql = `
        UPDATE Suppliers
        SET LOGINID = ?, SUPPLIERNAME = ?, EMAIL = ?, PHONE = ?, ADDRESS = ?
        WHERE ID = ?
    `;
  const [result] = await pool.query(sql, [
    loginId,
    supplierName,
    email,
    phone,
    address,
    id,
  ]);
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
  const { firstName, lastName, phone, address, latitude, longitude } =
    customerInfo;

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
  const sql = `INSERT INTO SALES (PRICE, SALEDATE, PAYMENTDETAILS) VALUES (?, ?, ?)`;
  const [result] = await pool.query(sql, [price, saleDate, paymentDetails]);
  return getSaleById(result.insertId);
}

export async function getSales() {
  const sql = `SELECT * FROM SALES ORDER BY SALEDATE DESC`;
  const [rows] = await pool.query(sql);
  return rows;
}

// Get dashboard statistics
export async function getDashboardStatistics() {
  try {
    const salesStats = `
      SELECT 
        COALESCE(SUM(PRICE), 0) as total,
        COUNT(*) as count
      FROM SALES`;

    const todayStats = `
      SELECT 
        COALESCE(SUM(PRICE), 0) as total,
        COUNT(*) as count
      FROM SALES 
      WHERE DATE(SALEDATE) = CURDATE()`;

    const monthlyStats = `
      SELECT 
        COALESCE(SUM(PRICE), 0) as total,
        COUNT(*) as count
      FROM SALES 
      WHERE SALEDATE >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)`;

    const customerStats = `
      SELECT COUNT(DISTINCT CUSTOMERID) as total
      FROM SALES`;

    const todayCustomers = `
      SELECT COUNT(DISTINCT CUSTOMERID) as count
      FROM SALES 
      WHERE DATE(SALEDATE) = CURRENT_DATE()`;

    const monthlyCustomers = `
      SELECT COUNT(DISTINCT CUSTOMERID) as count
      FROM SALES 
      WHERE SALEDATE >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)`;

    // Add console logs for debugging
    console.log("Current server time:", new Date());
    const [timeCheck] = await pool.query(
      "SELECT NOW() as now, CURRENT_DATE() as today"
    );
    console.log("Database time:", timeCheck[0]);

    // Execute all queries
    const [
      [sales],
      [today],
      [monthly],
      [customers],
      [todayCust],
      [monthlyCust],
    ] = await Promise.all([
      pool.query(salesStats),
      pool.query(todayStats),
      pool.query(monthlyStats),
      pool.query(customerStats),
      pool.query(todayCustomers),
      pool.query(monthlyCustomers),
    ]);

    // Log results for debugging
    console.log("Today's stats:", today[0]);
    console.log("Monthly stats:", monthly[0]);

    // Combine results
    return {
      totalEarnings: parseFloat(sales[0].total),
      todayEarnings: parseFloat(today[0].total),
      monthlyEarnings: parseFloat(monthly[0].total),
      totalSales: parseInt(sales[0].count),
      todayOrders: parseInt(today[0].count),
      monthlyOrders: parseInt(monthly[0].count),
      totalCustomers: parseInt(customers[0].total),
      todayCustomers: parseInt(todayCust[0].count),
      monthlyCustomers: parseInt(monthlyCust[0].count),
    };
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

// Function to get sale details by sale ID
export async function getSaleById(saleId) {
  const sql = `
      SELECT 
        S.ID AS saleId,
        S.CUSTOMERID AS customerId,
        S.PRICE AS totalPrice,
        S.SALEDATE AS saleDate,
        S.PAYMENTDETAILS AS paymentDetails,
        S.SALE_STATUS AS saleStatus,
        S.DELIVERYFEE AS deliveryFee,
        SP.PRODUCTID AS productId,
        SP.QUANTITY AS quantity,
        SP.PRICE AS productPrice,
        P.PRODUCTNAME AS productName,
        P.PRICE AS price,
        P.WEIGHT AS weight,
        P.PICTURE_URL AS pictureUrl,
        C.FIRSTNAME AS customerFirstName,
        C.LASTNAME AS customerLastName,
        C.ADDRESS AS customerAddress,
        C.PHONE AS customerPhone
      FROM SALES S
      INNER JOIN SALES_PRODUCTS SP ON S.ID = SP.SALESID
      INNER JOIN PRODUCTS P ON SP.PRODUCTID = P.ID
      INNER JOIN CUSTOMERS C ON S.CUSTOMERID = C.ID
      WHERE S.ID = ?
    `;
  const [rows] = await pool.execute(sql, [saleId]);

  if (rows.length === 0) {
    return null;
  }

  // Organize products into a structured format
  const saleDetails = {
    saleId: rows[0].saleId,
    customerId: rows[0].customerId,
    customerFirstName: rows[0].customerFirstName,
    customerLastName: rows[0].customerLastName,
    customerAddress: rows[0].customerAddress,
    customerPhone: rows[0].customerPhone,
    totalPrice: rows[0].totalPrice,
    saleDate: rows[0].saleDate,
    paymentDetails: rows[0].paymentDetails,
    saleStatus: rows[0].saleStatus,
    deliveryFee: rows[0].deliveryFee,
    products: rows.map((row) => ({
      productId: row.productId,
      quantity: row.quantity,
      price: row.price,
      productName: row.productName,
      weight: row.weight,
      pictureUrl: row.pictureUrl,
    })),
  };

  return saleDetails;
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
        S.DELIVERYFEE AS deliveryFee,
        SP.PRODUCTID AS productId,
        SP.QUANTITY AS quantity,
        SP.PRICE AS productPrice,
        P.PRODUCTNAME AS productName,
        P.PRICE AS price,
        P.WEIGHT AS weight,
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
        deliveryFee: row.deliveryFee,
        products: [],
      };
    }

    salesMap[saleId].products.push({
      productId: row.productId,
      quantity: row.quantity,
      price: row.price,
      productName: row.productName,
      weight: row.weight,
      pictureUrl: row.pictureUrl,
    });
  }

  // Convert the sales map into an array
  const sales = Object.values(salesMap);
  return sales;
}

// Function to update sale status
export async function updateSaleStatus(saleId, newStatus) {
  const sql = `
        UPDATE SALES
        SET SALE_STATUS = ?
        WHERE ID = ?
    `;
  const [result] = await pool.query(sql, [newStatus, saleId]);
  return result.affectedRows > 0;
}

// Function to update order status
export async function updateOrderStatus(orderId, newStatus) {
  const sql = `
        UPDATE ORDERS
        SET ORDER_STATUS = ?
        WHERE ID = ?
    `;
  const [result] = await pool.query(sql, [newStatus, orderId]);
  return result.affectedRows > 0;
}

// Check Product Availability
export async function checkProductAvailability(products) {
  const unavailableProducts = [];

  for (const { productId, quantity } of products) {
    const sql = `
            SELECT QUANTITY, PRODUCTNAME FROM PRODUCTS
            WHERE ID = ?
        `;
    const [product] = await query(sql, [productId]);

    if (!product || product.QUANTITY < quantity) {
      unavailableProducts.push({
        productId,
        productName: product ? product.PRODUCTNAME : "Unknown Product",
        availableQuantity: product ? product.QUANTITY : 0,
      });
    }
  }

  return unavailableProducts;
}

// Place Sale
export async function placeSale(customerId, products, stripePaymentId) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insert into SALES table
    const saleSql = `
            INSERT INTO SALES (CUSTOMERID, PRICE, SALEDATE, PAYMENTDETAILS, SALE_STATUS)
            VALUES (?, ?, CURDATE(), ?, ?)
        `;
    const totalPrice = await calculateTotalPrice(products);
    //const saleDate = new Date().toISOString().slice(0, 10);
    const paymentDetails = `Stripe Payment ID: ${stripePaymentId}`;
    const saleStatus = "NOT STARTED";

    const [saleResult] = await connection.execute(saleSql, [
      customerId,
      totalPrice,
      //saleDate,
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
      await connection.execute(saleProductSql, [
        saleId,
        productId,
        quantity,
        price,
      ]);
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

// update sale delivery fee
export async function updateSaleDeliveryFee(saleId, deliveryFee) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // First get the current sale price
    const [currentSale] = await connection.query(
      "SELECT PRICE FROM SALES WHERE ID = ?",
      [saleId]
    );

    if (!currentSale.length) {
      return null;
    }

    // Update the sale with delivery fee
    const sql = `
      UPDATE SALES 
      SET PRICE = PRICE + ?,
          DELIVERYFEE = ?
      WHERE ID = ?
    `;

    const [result] = await connection.query(sql, [
      deliveryFee,
      deliveryFee,
      saleId,
    ]);

    if (result.affectedRows > 0) {
      // Get the updated total price
      const [updatedSale] = await connection.query(
        "SELECT PRICE as totalPrice FROM SALES WHERE ID = ?",
        [saleId]
      );

      await connection.commit();
      return {
        success: true,
        totalPrice: updatedSale[0].totalPrice,
        deliveryFee: deliveryFee,
      };
    }

    await connection.rollback();
    return null;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ------------------------------------------------------------ SALES PRODUCTS --------------------------------------------------------------------//

export async function createSalesProduct(salesId, productId, quantity, price) {
  const sql = `INSERT INTO SALES_PRODUCTS (SALESID, PRODUCTID, QUANTITY, PRICE) VALUES (?, ?, ?, ?)`;
  const [result] = await pool.query(sql, [salesId, productId, quantity, price]);
  return getSalesProductById(result.insertId);
}

export async function getSalesProducts() {
  const [rows] = await pool.query("SELECT * FROM SALES_PRODUCTS");
  return rows;
}

export async function getSalesProductById(id) {
  const [rows] = await pool.query("SELECT * FROM SALES_PRODUCTS WHERE ID = ?", [
    id,
  ]);
  return rows[0];
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
  const sql = `INSERT INTO ORDERS (PRICE, ORDERDATE, PAYMENTDETAILS) VALUES (?, ?, ?)`;
  const [result] = await pool.query(sql, [price, orderDate, paymentDetails]);
  return getOrderById(result.insertId);
}

export async function getOrders() {
  const [rows] = await pool.query("SELECT * FROM ORDERS");
  return rows;
}

export async function getOrderById(id) {
  const [rows] = await pool.query("SELECT * FROM ORDERS WHERE ID = ?", [id]);
  return rows[0];
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ------------------------------------------------------------ ORDERS PORODUCTS ------------------------------------------------------------------//

export async function getOrdersWithDetails() {
  const sql = `
    SELECT 
      O.ID as orderId,
      O.PRICE as totalPrice,
      O.ORDERDATE,
      O.ORDER_STATUS,
      S.SUPPLIERNAME,
      OP.QUANTITY,
      OP.PRICE as productPrice,
      P.PRODUCTNAME,
      P.BRAND
    FROM ORDERS O
    JOIN SUPPLIERS S ON O.SUPPLIERID = S.ID
    JOIN ORDERS_PRODUCTS OP ON O.ID = OP.ORDERID
    JOIN PRODUCTS P ON OP.PRODUCTID = P.ID
    ORDER BY O.ORDERDATE DESC`;

  const [rows] = await pool.query(sql);
  return rows;
}

export async function createOrderProduct(orderId, productId, quantity, price) {
  const sql = `INSERT INTO ORDERS_PRODUCTS (ORDERID, PRODUCTID, QUANTITY, PRICE) VALUES (?, ?, ?, ?)`;
  const [result] = await pool.query(sql, [orderId, productId, quantity, price]);
  return getOrderProductById(result.insertId);
}

export async function getOrdersProducts() {
  const [rows] = await pool.query("SELECT * FROM ORDERS_PRODUCTS");
  return rows;
}

export async function getOrderProductById(id) {
  const [rows] = await pool.query(
    "SELECT * FROM ORDERS_PRODUCTS WHERE ID = ?",
    [id]
  );
  return rows[0];
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ---------------------------------------------------------------- BALANCE -----------------------------------------------------------------------//

export async function getBalance() {
  const [rows] = await pool.query(
    "SELECT * FROM BALANCE ORDER BY TIMESTAMP DESC LIMIT 1"
  );
  return rows[0];
}

export async function storeBalance(balance) {
  const sql = `INSERT INTO BALANCE (BALANCE) VALUES (?)`;
  const [result] = await pool.query(sql, [balance]);
  return result.insertId;
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ---------------------------------------------------------------- MAPBOX ------------------------------------------------------------------------//

// Starting coordinates locked in for now on school coords
const START_LAT = 37.337214;
const START_LNG = -121.882696;

export async function planDeliveryRoute() {
  const startCoord = { latitude: START_LAT, longitude: START_LNG };

  const deliveryAddresses = [
    "1016 Johnson Ave, San Jose, CA 95129",
    "2430 Newhall St, San Jose, CA 95128",
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
