import { getAllProducts } from '../models/products/productModel.js';

// Controller for the home page
// routes/index.js - > router.get('/', showHome);
export const showHome = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    const featured = products.slice(0, 3);
    res.render('home', { title: 'Big Red Button', featured });
  } catch (error) {
    next(error);
  }
};
