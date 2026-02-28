import { getAllProducts } from '../models/productModel.js';

export const showHome = (req, res, next) => {
  try {
    const featured = getAllProducts().slice(0, 3);
    res.render('home', { title: 'Big Red Button', featured });
  } catch (error) {
    next(error);
  }
};
