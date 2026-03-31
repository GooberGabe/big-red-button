import { Router } from 'express';
import { showHome } from '../controllers/homeController.js';
import { listProducts } from '../controllers/productController.js';
// Removed accountController and contactController imports
import { showRegistrationForm, processRegistration, showAllUsers } from '../controllers/userController.js';

// Hook up controllers to routes 

const router = Router();

router.use('/', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/styles.css">');
    next();
});

router.get('/', showHome);
router.get('/products', listProducts);

// Removed /account/create routes


// User registration
router.get('/register', showRegistrationForm);
router.post('/register', processRegistration);

// User list
router.get('/users', showAllUsers);

// Removed /contact routes

export default router;
