// userController.js
import bcrypt from "bcryptjs";
import {
  getLoginByEmail,
  createLogin,
  createUserInfo,
  createCustomer,
  createSupplier,
  createEmployee,
  getAdminCount, // Import the new function
  getEmployeeBySSN, // Import the new function
  resetPassword, // Import the resetPassword function
  updateFirstTimeLogin // Import the updateFirstTimeLogin function
} from "./database.js";

// Function to generate a one-time password
export function generateOneTimePassword() {
  const length = 14;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  while (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?><,./-]).{14,}/.test(password)) {
    password = Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
  }
  return password;
}

export async function registerAdmin(req, res) {
  const { email, password, newPassword } = req.body;

  // Input validation
  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required." });
  }

  try {
    // Check if an admin already exists
    const adminCount = await getAdminCount();
    if (adminCount > 0) {
      return res.status(409).json({ message: "An admin already exists." });
    }

    // Check if the email already exists
    const existingUser = await getLoginByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    let hashedPassword;
    if (!password) {
      // If password is empty, prompt to update with new password
      if (!newPassword) {
        return res.status(400).json({ message: "Password is required. Please provide a new password." });
      }
      hashedPassword = await bcrypt.hash(newPassword, 10);
    } else {
      // Hash the provided password
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Get the current date
    const accountCreationDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

    // Set the role as 'admin'
    const role = 'admin';

    // Insert the new user into the LOGIN table
    const loginId = await createLogin(
      email,
      hashedPassword,
      accountCreationDate,
      role
    );

    // Optionally, create an entry in the INFO table
    await createUserInfo(loginId);

    res.status(201).json({ message: "Admin registered successfully." });
  } catch (error) {
    console.error("Error registering admin:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function registerCustomer(req, res) {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Check if the email already exists
    const existingUser = await getLoginByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email already exists. Please log in." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Get the current date
    const accountCreationDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

    // Set the role as 'admin'
    const role = 'customer';

    // Insert the new user into the LOGIN table
    const loginId = await createLogin(
      email,
      hashedPassword,
      accountCreationDate,
      role
    );

    // Optionally, create an entry in the INFO table
    await createCustomer(loginId);

    res.status(201).json({ message: "Customer registered successfully." });
  } catch (error) {
    console.error("Error registering customer:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function registerSupplier(req, res) {
  const { email, password, supplierName } = req.body;

  // Input validation
  if (!email || !password || !supplierName) {
    return res
      .status(400)
      .json({ message: "Email, password, and supplier name are required." });
  }

  try {
    // Check if the email already exists
    const existingUser = await getLoginByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email already exists. Please log in." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Get the current date
    const accountCreationDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

    // Set the role as 'supplier'
    const role = 'supplier';

    // Insert the new user into the LOGIN table
    const loginId = await createLogin(
      email,
      hashedPassword,
      accountCreationDate,
      role
    );

    // Create an entry in the SUPPLIERS table
    await createSupplier(loginId, supplierName, email);

    res.status(201).json({ message: "Supplier registered successfully." });
  } catch (error) {
    console.error("Error registering supplier:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function registerEmployee(req, res) {
  const { email, firstName, lastName, ssn, salary, phone, address, startDate, endDate } = req.body;

  // Input validation
  if (!email || !firstName || !lastName || !ssn || !salary || !startDate) {
    return res
      .status(400)
      .json({ message: "All fields are required." });
  }

  try {
    // check if email already exists
    // check if ssn already exists
    const existingUser = await getLoginByEmail(email);
    const existingSSN = await getEmployeeBySSN(ssn);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email already exists. Please log in." });
    } else if (existingSSN) {
      return res
        .status(409)
        .json({ message: "SSN already exists for another employee." });
    }

    // Generate a one-time password
    const oneTimePassword = generateOneTimePassword();
    const hashedPassword = await bcrypt.hash(oneTimePassword, 10);

    // Get the current date
    const accountCreationDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

    // Set the role as 'employee'
    const role = 'employee';

    // Insert the new user into the LOGIN table
    const loginId = await createLogin(
      email,
      hashedPassword,
      accountCreationDate,
      role
    );

    // Create an entry in the EMPLOYEES table
    await createEmployee({
      loginId,
      firstName,
      lastName,
      ssn,
      email,
      phone,
      address,
      salary,
      startDate,
      endDate: null // Assuming endDate is optional
    });

    res.status(201).json({ 
      message: "Employee registered successfully.",
      oneTimePassword // Include the unhashed one-time password in the response
    });
    
  } catch (error) {
    console.error("Error registering employee:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function updatePassword(req, res) {
  const { email, newPassword } = req.body;

  // Input validation
  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and new password are required." });
  }

  try {
    // Check if the email exists
    const existingUser = await getLoginByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: "Email not found." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password and reset the first time login flag
    const updatedPassword = await resetPassword(existingUser.ID, hashedPassword);
    const updatedFirstTimeLogin = await updateFirstTimeLogin(existingUser.ID, false);

    if (updatedPassword && updatedFirstTimeLogin) {
      // Log the user out
      req.logout((err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to log out after updating password." });
        }
        res.json({ message: "Password updated successfully. You have been logged out." });
      });
    } else {
      res.status(500).json({ message: "Failed to update password." });
    }
  } catch (error) {
    console.error("Error updating password:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}