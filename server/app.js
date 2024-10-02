// server/app.js

import express from 'express'
import {
  getGeneralInfo,
  getGeneralInfoById,
  createGeneralInfo,
  updateGeneralInfo,
  deleteGeneralInfo,
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
  deleteCustomer
} from './database.js'

const app = express()
app.use(express.json())
// LOGIN routes
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const loginId = await createLogin(username, password);
    res.status(201).json({ id: loginId });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/login/:username', async (req, res) => {
  try {
    const login = await getLogin(req.params.username);
    if (login) {
      res.json(login);
    } else {
      res.status(404).send('Login not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// CUSTOMERS routes
app.get('/customers', async (req, res) => {
  try {
    const customers = await getCustomers();
    res.json(customers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/customers/:id', async (req, res) => {
  try {
    const customer = await getCustomerById(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/customers', async (req, res) => {
  try {
    const { loginId, firstName, lastName, email, phone, address, latitude, longitude } = req.body;
    const newCustomer = await createCustomer(loginId, firstName, lastName, email, phone, address, latitude, longitude);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/customers/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, latitude, longitude } = req.body;
    const updatedCustomer = await updateCustomer(req.params.id, firstName, lastName, email, phone, address, latitude, longitude);
    if (updatedCustomer) {
      res.json(updatedCustomer);
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/customers/:id', async (req, res) => {
  try {
    const deleted = await deleteCustomer(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PRODUCTS routes
app.get('/products', async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/products', async (req, res) => {
  try {
    const { productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight } = req.body;
    const newProduct = await createProduct(productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const { productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight } = req.body;
    const updatedProduct = await updateProduct(req.params.id, productName, productDescription, quantity, reorderLevel, reorderQuantity, price, weight);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const deleted = await deleteProduct(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// BALANCE routes
app.get('/balance', async (req, res) => {
  try {
    const balance = await getBalance();
    res.json(balance);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/balance', async (req, res) => {
  try {
    const { balance } = req.body;
    const newBalanceId = await storeBalance(balance);
    res.status(201).json({ id: newBalanceId });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  
  app.listen(8080, () => {
    console.log('Server is running on port 8080.')
  })