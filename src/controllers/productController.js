import { getAllProducts } from '../models/productModel.js';

export const listProducts = (req, res, next) => {
  try {
    const products = getAllProducts();
    res.render('products', { title: 'Products', products });
  } catch (error) {
    next(error);
  }
};
