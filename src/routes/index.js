import { Router } from 'express';
import { showHome } from '../controllers/homeController.js';
import { listProducts } from '../controllers/productController.js';
import { showRegistrationForm, processRegistration, showAllUsers, registrationValidation } from '../controllers/forms/registration.js';
import { showLoginForm, processLogin, processLogout, loginValidation } from '../controllers/forms/login.js';
import { requireLogin } from '../middleware/auth.js';

// Hook up controllers to routes 

const router = Router();

router.use('/', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/styles.css">');
    next();
});

router.get('/', showHome);
router.get('/products', listProducts);

// User registration
router.get('/register', showRegistrationForm);
router.post('/register', registrationValidation, processRegistration);

// User list
router.get('/users', requireLogin, showAllUsers);

// Login/logout routes
router.get('/login', showLoginForm);
router.post('/login', loginValidation, processLogin);
router.get('/logout', processLogout);

export default router;
