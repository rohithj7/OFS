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

// GENERAL INFO //
app.get('/general-info', async (req, res) => {
    try {
        const generalInfo = await getGeneralInfo()
        res.json(generalInfo)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.get('/general-info/:id', async (req, res) => {
    try {
        const info = await getGeneralInfoById(req.params.id)
        if (info) {
            res.json(info)
        } else {
            res.status(404).send('General info not found')
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.post('/general-info', async (req, res) => {
    try {
        const newInfo = await createGeneralInfo(req.body)
        res.status(201).json(newInfo)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.put('/general-info/:id', async (req, res) => {
    try {
        const updatedInfo = await updateGeneralInfo(req.params.id, req.body)
        if (updatedInfo) {
            res.json(updatedInfo)
        } else {
            res.status(404).send('General info not found')
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.delete('/general-info/:id', async (req, res) => {
    try {
        const deletedInfo = await deleteGeneralInfo(req.params.id)
        if (deletedInfo) {
            res.json(deletedInfo)
        } else {
            res.status(404).send('General info not found')
        }
    } catch (err) {
        res.status(500).send(err.message)
    }
})


// EMPLOYEES //
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
        const newEmployee = await createEmployee(req.body)
        res.status(201).json(newEmployee)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

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


// EMPLOYEE_HOURS //
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

// PRODUCTS //
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

// SUPPLIERS //
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


// CUSTOMERS //
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





app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080.')
})