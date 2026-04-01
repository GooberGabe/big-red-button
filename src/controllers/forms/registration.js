import { emailExists, saveUser, getAllUsers } from '../../models/accounts/accountModel.js';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

export const registrationValidation = [
  body('username')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Username must be at least 2 characters'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  body('emailConfirm')
    .trim()
    .custom((value, { req }) => value === req.body.email)
    .withMessage('Email addresses must match'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*]/)
    .withMessage('Password must contain at least one special character'),
  body('passwordConfirm')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match')
];


// Show registration form
export const showRegistrationForm = (req, res) => {
  res.render('register', { title: 'Register', errors: [], formData: {} });
};

// Process registration
export const processRegistration = async (req, res) => {
  const errors = [];
  const formData = {
    email: req.body.email,
    username: req.body.username
  };

  // express-validator validation
  const result = validationResult(req);
  if (!result.isEmpty()) {
    result.array().forEach(err => errors.push(err.msg));
    return res.render('register', { title: 'Register', errors, formData });
  }

  // Custom validation: check if email already exists
  if (await emailExists(req.body.email)) {
    errors.push('Email is already registered.');
    return res.render('register', { title: 'Register', errors, formData });
  }

  // Hash password and save user
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await saveUser({ email: req.body.email, username: req.body.username, password: hashedPassword });
  res.redirect('/users');
};

// Show all users
export const showAllUsers = async (req, res) => {
  const users = await getAllUsers();
  res.render('users', { title: 'All Users', users });
};
