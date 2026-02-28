import { Router } from 'express';
import { showHome } from '../controllers/homeController.js';
import { listProducts } from '../controllers/productController.js';
import { showCreateForm, handleCreate } from '../controllers/accountController.js';
import { showForm, handleSubmit } from '../controllers/contactController.js';

const router = Router();

router.get('/', showHome);
router.get('/products', listProducts);

router.get('/account/create', showCreateForm);
router.post('/account/create', handleCreate);

router.get('/contact', showForm);
router.post('/contact', handleSubmit);

export default router;
