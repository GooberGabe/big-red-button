import { emailExists, saveUser, getAllUsers } from '../models/accounts/accountModel.js';
import bcrypt from 'bcrypt';

// TODO: Use express-validator for more robust validation and sanitization in the future

// Show registration form
export const showRegistrationForm = (req, res) => {
  res.render('register', { title: 'Register', errors: [], formData: {} });
};

// Process registration
export const processRegistration = async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;
  const errors = [];
  const formData = { email, username };

  // Basic validation
  if (!email || !username || !password || !confirmPassword) {
    errors.push('All fields are required.');
  }
  if (password !== confirmPassword) {
    errors.push('Passwords do not match.');
  }
  if (await emailExists(email)) {
    errors.push('Email is already registered.');
  }

  if (errors.length > 0) {
    return res.render('register', { title: 'Register', errors, formData });
  }

  // Hash password and save user
  const hashedPassword = await bcrypt.hash(password, 10);
  await saveUser({ email, username, password: hashedPassword });
  res.redirect('/users');
};

// Show all users
export const showAllUsers = async (req, res) => {
  const users = await getAllUsers();
  res.render('users', { title: 'All Users', users });
};
