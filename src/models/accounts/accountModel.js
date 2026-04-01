import { db } from '../db.js';

// Check if an email already exists
export const emailExists = async (email) => {
  const res = await db.query('SELECT 1 FROM accounts WHERE email = $1', [email]);
  return res.rowCount > 0;
};

// Save a new user
export const saveUser = async ({ email, username, password }) => {
  const res = await db.query(
    'INSERT INTO accounts (email, username, password) VALUES ($1, $2, $3) RETURNING *',
    [email, username, password]
  );
  return res.rows[0];
};

// Get all users
export const getAllUsers = async () => {
  const res = await db.query('SELECT id, email, username FROM accounts ORDER BY id');
  return res.rows;
};

// Get user by email
export const getUserByEmail = async (email) => {
  const res = await db.query('SELECT * FROM accounts WHERE email = $1', [email]);
  return res.rows[0];
};

// Verify password for login
export const verifyPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};
