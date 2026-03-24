import pkg from 'pg';
import fs from 'fs';
import path from 'path';
const { Pool } = pkg;
import { fileURLToPath } from 'url';

// TODO: Move all of this into its own file and export the pool for use across all models
// --> 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caCert = fs.readFileSync(path.join(__dirname, '../../bin', 'byuicse-psql-cert.pem'));

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    ca: caCert,  // Use the certificate content, not the file path
    rejectUnauthorized: true,  // Keep this true for proper security
    checkServerIdentity: () => { return undefined; }  // Skip hostname verification but keep cert chain validation
  }
});

// <--

// Get all products
export const getAllProducts = async () => {
  const res = await pool.query('SELECT * FROM products ORDER BY id');
  return res.rows;
};

// Add a new product
export const addProduct = async ({ name, description, price }) => {
  const res = await pool.query(
    'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
    [name, description, price]
  );
  return res.rows[0];
};