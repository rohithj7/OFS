// userController.js
import bcrypt from 'bcrypt';
import { getLoginByEmail, createLogin, createUserInfo, createCustomer } from './database.js';

export async function registerAdmin(req, res) {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Check if the email already exists
    const existingUser = await getLoginByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Get the current date
    const accountCreationDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

    // Insert the new user into the LOGIN table
    const loginId = await createLogin(email, hashedPassword, accountCreationDate);

    // Optionally, create an entry in the INFO table
    await createUserInfo(loginId);

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

export async function registerCustomer(req, res) {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if the email already exists
    const existingUser = await getLoginByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists. Please log in.' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Get the current date
    const accountCreationDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

    // Insert the new user into the LOGIN table
    const loginId = await createLogin(email, hashedPassword, accountCreationDate);

    // Optionally, create an entry in the INFO table
    await createCustomer(loginId);

    res.status(201).json({ message: 'Customer registered successfully.' });
  } catch (error) {
    console.error('Error registering customer:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
}