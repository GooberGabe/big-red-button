import { db } from './db.js';

// Get all products
export const getAllProducts = async () => {
  const res = await db.query('SELECT * FROM products ORDER BY id');
  return res.rows;
};

// Add a new product
export const addProduct = async ({ name, description, price }) => {
  const res = await db.query(
    'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
    [name, description, price]
  );
  return res.rows[0];
};