import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

import {
    getLoginByUsername,
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
    createCustomer,
    updateCustomer,
    deleteCustomer,
    
    getSales,

    getBalance,
    storeBalance
} from './database.js'
import { registerUser } from './userController.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
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
  new LocalStrategy(async (username, password, done) => {
    try {
      // Get user by username from the database
      const user = await getLoginByUsername(username);

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // Compare the hashed password
      const isValid = await bcrypt.compare(password, user.PASSWORD);
      if (!isValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user); // Authentication successful
    } catch (error) {
      return done(error);
    }
  })
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
  res.status(401).json({ message: 'Unauthorized' });
}

// Registration route
app.post('/register', registerUser);

// Login route
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully.' });
});

// Logout route
app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Logged out successfully.' });
  });
});

// Protected route to get user info
app.get('/userinfo', isAuthenticated, async (req, res) => {
  try {
    const loginId = req.user.ID;

    const userInfo = await getUserInfoByLoginId(loginId);

    if (!userInfo) {
      return res.status(404).json({ message: 'User info not found.' });
    }

    res.json(userInfo);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Protected route to update user info
app.post('/userinfo', isAuthenticated, async (req, res) => {
  try {
    const loginId = req.user.ID;
    const { address, latitude, longitude } = req.body;

    // Input validation
    if (!address || latitude === undefined || longitude === undefined) {
      return res
        .status(400)
        .json({ message: 'Address, latitude, and longitude are required.' });
    }

    // Update user info
    await updateUserInfo(loginId, address, latitude, longitude);

    res.json({ message: 'User info updated successfully.' });
  } catch (error) {
    console.error('Error updating user info:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.get('/userinfo', async (req, res) => {
  try {
    const generalInfo = await getUserInfo()
    res.json(generalInfo)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// EMPLOYEES routes
app.get('/employees', async (req, res) => {
  try {
    const employees = await getEmployees()
    res.json(employees)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.get('/employees/:id', async (req, res) => {
  try {
    const employee = await getEmployeeById(req.params.id)
    if (employee) {
      res.json(employee)
    } else {
      res.status(404).send('Employee not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.post('/employees', async (req, res) => {
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
        endDate
      } = req.body;
  
      // Validate required fields (adjust validation as necessary)
      if (!loginId || !ssn || !email || !salary || !startDate) {
        return res.status(400).json({ 
          error: 'Required fields: loginId, ssn, email, salary, and startDate' 
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
        endDate
      });
  
      // Respond with the newly created employee
      res.status(201).json(newEmployee);
    } catch (err) {
      console.error('Error creating employee:', err);
      res.status(500).send(err.message);
    }
  });  

app.put('/employees/:id', async (req, res) => {
  try {
    const updatedEmployee = await updateEmployee(req.params.id, req.body)
    if (updatedEmployee) {
      res.json(updatedEmployee)
    } else {
      res.status(404).send('Employee not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.delete('/employees/:id', async (req, res) => {
  try {
    const deletedEmployee = await deleteEmployee(req.params.id)
    if (deletedEmployee) {
      res.json(deletedEmployee)
    } else {
      res.status(404).send('Employee not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// EMPLOYEE_HOURS routes
app.get('/employee-hours', async (req, res) => {
  try {
    const employeeHours = await getEmployeeHours()
    res.json(employeeHours)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.get('/employee-hours/:id', async (req, res) => {
  try {
    const employeeHour = await getEmployeeHoursById(req.params.id)
    if (employeeHour) {
      res.json(employeeHour)
    } else {
      res.status(404).send('Employee hours not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.post('/employee-hours', async (req, res) => {
  try {
    const newEmployeeHour = await createEmployeeHours(req.body)
    res.status(201).json(newEmployeeHour)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.put('/employee-hours/:id', async (req, res) => {
  try {
    const updatedEmployeeHour = await updateEmployeeHours(req.params.id, req.body)
    if (updatedEmployeeHour) {
      res.json(updatedEmployeeHour)
    } else {
      res.status(404).send('Employee hours not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.delete('/employee-hours/:id', async (req, res) => {
  try {
    const deletedEmployeeHour = await deleteEmployeeHours(req.params.id)
    if (deletedEmployeeHour) {
      res.json(deletedEmployeeHour)
    } else {
      res.status(404).send('Employee hours not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// PRODUCTS routes
app.get('/products', async (req, res) => {
  try {
    const products = await getProducts()
    res.json(products)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.get('/products/:id', async (req, res) => {
  try {
    const product = await getProductById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).send('Product not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.post('/products', async (req, res) => {
  try {
    const newProduct = await createProduct(req.body)
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body)
    if (updatedProduct) {
      res.json(updatedProduct)
    } else {
      res.status(404).send('Product not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await deleteProduct(req.params.id)
    if (deletedProduct) {
      res.json(deletedProduct)
    } else {
      res.status(404).send('Product not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// SUPPLIERS routes
app.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await getSuppliers()
    res.json(suppliers)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.get('/suppliers/:id', async (req, res) => {
  try {
    const supplier = await getSupplierById(req.params.id)
    if (supplier) {
      res.json(supplier)
    } else {
      res.status(404).send('Supplier not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.post('/suppliers', async (req, res) => {
  try {
    const newSupplier = await createSupplier(req.body)
    res.status(201).json(newSupplier)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.put('/suppliers/:id', async (req, res) => {
  try {
    const updatedSupplier = await updateSupplier(req.params.id, req.body)
    if (updatedSupplier) {
      res.json(updatedSupplier)
    } else {
      res.status(404).send('Supplier not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.delete('/suppliers/:id', async (req, res) => {
  try {
    const deletedSupplier = await deleteSupplier(req.params.id)
    if (deletedSupplier) {
      res.json(deletedSupplier)
    } else {
      res.status(404).send('Supplier not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// CUSTOMERS routes
app.get('/customers', async (req, res) => {
  try {
    const customers = await getCustomers()
    res.json(customers)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.get('/customers/:id', async (req, res) => {
  try {
    const customer = await getCustomerById(req.params.id)
    if (customer) {
      res.json(customer)
    } else {
      res.status(404).send('Customer not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.post('/customers', async (req, res) => {
  try {
    const newCustomer = await createCustomer(req.body)
    res.status(201).json(newCustomer)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.put('/customers/:id', async (req, res) => {
  try {
    const updatedCustomer = await updateCustomer(req.params.id, req.body)
    if (updatedCustomer) {
      res.json(updatedCustomer)
    } else {
      res.status(404).send('Customer not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.delete('/customers/:id', async (req, res) => {
  try {
    const deletedCustomer = await deleteCustomer(req.params.id)
    if (deletedCustomer) {
      res.json(deletedCustomer)
    } else {
      res.status(404).send('Customer not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// SALES routes
app.get('/sales', async (req, res) => {
  try {
    const sales = await getSales()
    res.json(sales)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.get('/sales/:id', async (req, res) => {
  try {
    const sale = await getSaleById(req.params.id)
    if (sale) {
      res.json(sale)
    } else {
      res.status(404).send('Sale not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.post('/sales', async (req, res) => {
  try {
    const newSale = await createSale(req.body)
    res.status(201).json(newSale)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// SALES_PRODUCTS routes
app.get('/sales-products', async (req, res) => {
  try {
    const salesProducts = await getSalesProducts()
    res.json(salesProducts)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.post('/sales-products', async (req, res) => {
  try {
    const newSalesProduct = await createSalesProduct(req.body)
    res.status(201).json(newSalesProduct)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// ORDERS routes
app.get('/orders', async (req, res) => {
  try {
    const orders = await getOrders()
    res.json(orders)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.get('/orders/:id', async (req, res) => {
  try {
    const order = await getOrderById(req.params.id)
    if (order) {
      res.json(order)
    } else {
      res.status(404).send('Order not found')
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.post('/orders', async (req, res) => {
  try {
    const newOrder = await createOrder(req.body)
    res.status(201).json(newOrder)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// ORDERS_PRODUCTS routes
app.get('/orders-products', async (req, res) => {
  try {
    const ordersProducts = await getOrdersProducts()
    res.json(ordersProducts)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.post('/orders-products', async (req, res) => {
  try {
    const newOrderProduct = await createOrderProduct(req.body)
    res.status(201).json(newOrderProduct)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// BALANCE routes
app.get('/balance', async (req, res) => {
  try {
    const balance = await getBalance()
    res.json(balance)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.post('/balance', async (req, res) => {
  try {
    const { balance } = req.body
    const newBalanceId = await storeBalance(balance)
    res.status(201).json({ id: newBalanceId })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});