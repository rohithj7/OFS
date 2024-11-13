import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import {
  getLoginByEmail,
  getLoginById,
  getUserInfoByLoginId,
  updateUserInfo,
  getUserInfo,
  // TODO: Add delete function with keeping authentication in mind
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeHours,
  getEmployeeHoursById,
  createEmployeeHours,
  updateEmployeeHours,
  deleteEmployeeHours,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getCustomers,
  getCustomerById,
  getSalesByCustomerId,
  deleteCustomer,
  getSales,
  getBalance,
  storeBalance,
  checkProductAvailability,
  placeSale,
  getOrdersByLoginId,
  updateCustomerInfo,
  searchProductsByName,
  getProductsByCategory,
  planDeliveryRoute,
  getProductsBelowReorderLevel,
  reorderProduct,
  getProductIdByName,
  getSupplierIdByName,
  updateSaleStatus,
  resetPassword,
  updateFirstTimeLogin
} from "./database.js";
import { registerAdmin, registerCustomer, registerSupplier, registerEmployee, generateOneTimePassword, updatePassword } from "./userController.js";

const app = express();

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow cookies and other credentials to be sent
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true, // prevent XSS attacks
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Passport.js local strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // Specify that 'email' is the username field
    async (email, password, done) => {
      try {
        // Get user by email from the database
        const user = await getLoginByEmail(email);

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        // Compare the hashed password
        const isValid = await bcrypt.compare(password, user.PASSWORD);
        if (!isValid) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user); // Authentication successful
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize and deserialize user (for session handling)
passport.serializeUser((user, done) => {
  done(null, user.ID); // Store user ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getLoginById(id);
    done(null, user); // Attach user object to req.user
  } catch (error) {
    done(error);
  }
});

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

// Middleware to check admin authentication
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.ROLE === 'admin') {
    return next();
  }
  res.status(403).json({ message: "Forbidden for non-admins" });
}

// Middleware to check if the user is either an admin or an employee
function isAdminOrEmployee(req, res, next) {
  if (req.isAuthenticated() && (req.user.ROLE === 'admin' || req.user.ROLE === 'employee')) {
    return next();
  }
  res.status(403).json({ message: "Forbidden for non-admins and non-employees" });
}

// Middleware to check if the user is either an admin or a supplier
function isAdminOrSupplier(req, res, next) {
  if (req.isAuthenticated() && (req.user.ROLE === 'admin' || req.user.ROLE === 'supplier')) {
    return next();
  }
  res.status(403).json({ message: "Forbidden for non-admins and non-suppliers" });
}

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// -------------------------------------------------------- REGISTER AND LOGIN --------------------------------------------------------------------//

// Admin registration route
app.post("/registerAdmin", registerAdmin);

// Customer registration route
app.post("/registerCustomer", registerCustomer);

// Supplier registration route; requires admin logged in
app.post("/registerSupplier", isAdmin, registerSupplier);

// Employee registration route; requires admin logged in
app.post("/registerEmployee", isAdmin, registerEmployee);

// Login route
app.post("/login", passport.authenticate("local"), async (req, res) => {
  try {
    const user = req.user;
    if (user.ROLE === 'employee' && user.FIRST_TIME_LOGIN) {
      // Set FIRST_TIME_LOGIN flag to false
      await updateFirstTimeLogin(user.ID, false);
      return res.json({ message: "First-time login. Please update your password.", firstTimeLogin: true, redirectTo: "/update-password" });
    }
    res.json({ message: "Logged in successfully.", loginId: user.ID });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Route to update password for first-time login
app.put("/update-password", isAuthenticated, updatePassword);

// Logout route
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Logged out successfully." });
  });
});

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ------------------------------------------------------------- ADMIN INFO -----------------------------------------------------------------------//

// Protected route to get user info
app.get("/userinfo", isAuthenticated, async (req, res) => {
  try {
    const loginId = req.user.ID;

    const userInfo = await getUserInfoByLoginId(loginId);

    if (!userInfo) {
      return res.status(404).json({ message: "User info not found." });
    }

    res.json(userInfo);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Protected route to update user info
app.post("/userinfo", isAuthenticated, async (req, res) => {
  try {
    const loginId = req.user.ID;
    const { address, latitude, longitude } = req.body;

    // Input validation
    if (!address || latitude === undefined || longitude === undefined) {
      return res
        .status(400)
        .json({ message: "Address, latitude, and longitude are required." });
    }

    // Update user info
    await updateUserInfo(loginId, address, latitude, longitude);

    res.json({ message: "User info updated successfully." });
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Admin routes
app.get("/admin/users", isAdmin, async (req, res) => {
  try {
    const users = await getUserInfo();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.delete("/admin/users/:id", isAdmin, async (req, res) => {
  try {
    const deletedUser = await deleteCustomer(req.params.id);
    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Admin PRODUCTS
// Admin route to get products below reorder level
app.get("/admin/products-below-reorder-level", isAdmin, async (req, res) => {
  try {
    const products = await getProductsBelowReorderLevel();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products below reorder level:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Admin PRODUCTS
// Admin route to reorder products
app.post("/admin/reorder-product", isAdmin, async (req, res) => {
  try {
    const { productName, supplierName, quantity } = req.body;

    // Get product ID and supplier ID
    const productId = await getProductIdByName(productName);
    const supplierId = await getSupplierIdByName(supplierName);

    if (!productId || !supplierId) {
      return res.status(400).json({ message: "Invalid product or supplier name." });
    }

    // Reorder product
    const reorderResult = await reorderProduct(productId, supplierId, quantity);

    res.json({
      message: "Product reordered successfully.",
      orderId: reorderResult.orderId,
      reorderQuantity: reorderResult.reorderQuantity,
      price: reorderResult.price,
    });
  } catch (error) {
    console.error("Error reordering product:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Route to reset password for admin
app.put("/admin/reset-password", isAdmin, async (req, res) => {
  try {
    const adminId = req.user.ID;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    const updated = await resetPassword(adminId, hashedPassword);

    if (updated) {
      res.json({ message: "Password reset successfully." });
    } else {
      res.status(500).json({ message: "Failed to reset password." });
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// -------------------------------------------------------------- EMPLOYEES -----------------------------------------------------------------------//

// EMPLOYEES routes
app.get("/employees", async (req, res) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/employees/:id", async (req, res) => {
  try {
    const employee = await getEmployeeById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/employees", async (req, res) => {
  try {
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
    } = req.body;

    // Validate required fields (adjust validation as necessary)
    if (!loginId || !ssn || !email || !salary || !startDate) {
      return res.status(400).json({
        error: "Required fields: loginId, ssn, email, salary, and startDate",
      });
    }

    // Call the createEmployee function (pass the extracted fields)
    const newEmployee = await createEmployee({
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
    });

    // Respond with the newly created employee
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).send(err.message);
  }
});

app.put("/employees/:id", async (req, res) => {
  try {
    const updatedEmployee = await updateEmployee(req.params.id, req.body);
    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/employees/:id", async (req, res) => {
  try {
    const deletedEmployee = await deleteEmployee(req.params.id);
    if (deletedEmployee) {
      res.json(deletedEmployee);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ----------------------------------------------------------- EMPLOYEE HOURS ---------------------------------------------------------------------//

// EMPLOYEE_HOURS routes
app.get("/employee-hours", async (req, res) => {
  try {
    const employeeHours = await getEmployeeHours();
    res.json(employeeHours);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/employee-hours/:id", async (req, res) => {
  try {
    const employeeHour = await getEmployeeHoursById(req.params.id);
    if (employeeHour) {
      res.json(employeeHour);
    } else {
      res.status(404).send("Employee hours not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/employee-hours", async (req, res) => {
  try {
    const newEmployeeHour = await createEmployeeHours(req.body);
    res.status(201).json(newEmployeeHour);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put("/employee-hours/:id", async (req, res) => {
  try {
    const updatedEmployeeHour = await updateEmployeeHours(
      req.params.id,
      req.body
    );
    if (updatedEmployeeHour) {
      res.json(updatedEmployeeHour);
    } else {
      res.status(404).send("Employee hours not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/employee-hours/:id", async (req, res) => {
  try {
    const deletedEmployeeHour = await deleteEmployeeHours(req.params.id);
    if (deletedEmployeeHour) {
      res.json(deletedEmployeeHour);
    } else {
      res.status(404).send("Employee hours not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// --------------------------------------------------------------- PRODUCTS -----------------------------------------------------------------------//

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Apply authentication middleware to the routes
app.post("/products", isAuthenticated, async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put("/products/:id", isAuthenticated, async (req, res) => {
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/products/:id", isAuthenticated, async (req, res) => {
  try {
    const deletedProduct = await deleteProduct(req.params.id);
    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Product search by name
app.get("/product-search", async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required." });
    }

    const products = await searchProductsByName(searchTerm);
    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Get all products by category
app.get("/products/category/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await getProductsByCategory(categoryId);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// -------------------------------------------------------------- SUPPLIERS -----------------------------------------------------------------------//

// SUPPLIERS routes
app.get("/suppliers", async (req, res) => {
  try {
    const suppliers = await getSuppliers();
    res.json(suppliers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/suppliers/:id", async (req, res) => {
  try {
    const supplier = await getSupplierById(req.params.id);
    if (supplier) {
      res.json(supplier);
    } else {
      res.status(404).send("Supplier not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/suppliers", async (req, res) => {
  try {
    const newSupplier = await createSupplier(req.body);
    res.status(201).json(newSupplier);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put("/suppliers/:id", async (req, res) => {
  try {
    const updatedSupplier = await updateSupplier(req.params.id, req.body);
    if (updatedSupplier) {
      res.json(updatedSupplier);
    } else {
      res.status(404).send("Supplier not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/suppliers/:id", async (req, res) => {
  try {
    const deletedSupplier = await deleteSupplier(req.params.id);
    if (deletedSupplier) {
      res.json(deletedSupplier);
    } else {
      res.status(404).send("Supplier not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// -------------------------------------------------------------- CUSTOMERS -----------------------------------------------------------------------//

// Get all customers
app.get("/customers", isAuthenticated, async (req, res) => {
  try {
    const customers = await getCustomers();
    res.json(customers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//get cusotmer info
app.get('/customerinfo', isAuthenticated, async (req, res) => {
  try {
    const loginId = req.user.ID;
    const customer = await getCustomerById(loginId);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error fetching customer info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update customer info
app.put("/customerinfo", isAuthenticated, async (req, res) => {
  try {
    const loginId = req.user.ID;
    const customerInfo = req.body;

    // Input validation
    const { firstName, lastName, phone, address } = customerInfo;
    if (!firstName || !lastName || !phone || !address) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    await updateCustomerInfo(loginId, customerInfo);
    res.json({ message: "Customer info updated successfully." });
  } catch (error) {
    console.error("Error updating customer info:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.delete("/customers/:id", async (req, res) => {
  try {
    const deletedCustomer = await deleteCustomer(req.params.id);
    if (deletedCustomer) {
      res.json(deletedCustomer);
    } else {
      res.status(404).send("Customer not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ---------------------------------------------------------------- SALES -------------------------------------------------------------------------//

// SALES routes
app.get("/all_sales", async (req, res) => {
  try {
    const sales = await getSales();
    res.json(sales);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to get all sales for the authenticated customer
app.get('/sales', isAuthenticated, async (req, res) => {
  try {
    const loginId = req.user.ID;

    // Get the customer associated with this loginId
    const customer = await getCustomerById(loginId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found.' });
    }

    const customerId = customer.ID;

    // Get all sales for this customer
    const sales = await getSalesByCustomerId(customerId);

    res.json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Protected route to check product availability (Checkout)
app.post("/checkout", isAuthenticated, async (req, res) => {
  try {
    const products = req.body.products; // [{ productId, quantity }, ...]
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ message: "Invalid products data." });
    }

    // Check product availability
    const unavailableProducts = await checkProductAvailability(products);

    if (unavailableProducts.length > 0) {
      return res.status(400).json({
        message: "Some products are unavailable or insufficient quantity.",
        unavailableProducts,
      });
    }

    // All products are available
    res.json({ message: "All products are available." });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Protected route to place a sale
app.post("/place-sale", isAuthenticated, async (req, res) => {
  try {
    const products = req.body.products; // [{ productId, quantity }, ...]
    if (!products || !Array.isArray(products) || products.length <= 0) {
      return res.status(400).json({ message: "Invalid products data." });
    }

    // Check product availability
    const unavailableProducts = await checkProductAvailability(products);

    if (unavailableProducts.length > 0) {
      return res.status(400).json({
        message: "Some products are unavailable or insufficient quantity.",
        unavailableProducts,
      });
    }

    // Get customer ID
    const loginId = req.user.ID;
    const customer = await getCustomerById(loginId);

    // Place the sale
    const saleResult = await placeSale(customer.ID, products);

    res.json({
      message: "Sale placed successfully.",
      saleId: saleResult.saleId,
      totalPrice: saleResult.totalPrice,
    });
  } catch (error) {
    console.error("Error placing sale:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Route to update sale status
app.put("/sales/:id/status", isAdminOrEmployee, async (req, res) => {
  try {
    const saleId = req.params.id;
    const { newStatus } = req.body;

    if (!newStatus) {
      return res.status(400).json({ message: "New status is required." });
    }

    const updated = await updateSaleStatus(saleId, newStatus);

    if (updated) {
      res.json({ message: "Sale status updated successfully." });
    } else {
      res.status(404).json({ message: "Sale not found." });
    }
  } catch (error) {
    console.error("Error updating sale status:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ---------------------------------------------------------------- ORDERS ------------------------------------------------------------------------//

// Get all orders by login ID
app.get("/orders", isAuthenticated, async (req, res) => {
  try {
    const loginId = req.user.ID;
    const orders = await getOrdersByLoginId(loginId);
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const newOrder = await createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ---------------------------------------------------------------- BALANCE -----------------------------------------------------------------------//

// BALANCE routes
app.get("/balance", async (req, res) => {
  try {
    const balance = await getBalance();
    res.json(balance);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/balance", async (req, res) => {
  try {
    const { balance } = req.body;
    const newBalanceId = await storeBalance(balance);
    res.status(201).json({ id: newBalanceId });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ---------------------------------------------------------------- MAPBOX ------------------------------------------------------------------------//

app.get('/route', async (req, res) => {
    try {
        const routeData = await planDeliveryRoute();
        res.json(routeData);
    } catch (error) {
        console.error('Error generating route:', error);
        res.status(500).json({ message: 'Error generating route' });
    }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------//

// ----------------------------------------------------------- PORTS AND STUFF --------------------------------------------------------------------//

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
