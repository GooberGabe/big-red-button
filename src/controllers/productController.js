import { getAllProducts } from '../models/products/productModel.js';

export const listProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.render('products', { title: 'Products', products });
  } catch (error) {
    next(error);
  }
};
