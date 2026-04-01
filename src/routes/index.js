import { Router } from 'express';
import { showHome } from '../controllers/homeController.js';
import { showProfile } from '../controllers/profileController.js';
import { listProducts } from '../controllers/productController.js';
import { showRegistrationForm, processRegistration, showAllUsers, registrationValidation } from '../controllers/forms/registration.js';
import { showLoginForm, processLogin, processLogout, loginValidation } from '../controllers/forms/login.js';
import { requireLogin } from '../middleware/auth.js';

const router = Router();

router.use('/', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/partials/base.css">', 10);
    res.addStyle('<link rel="stylesheet" href="/css/partials/layout.css">', 9);
    res.addStyle('<link rel="stylesheet" href="/css/partials/components.css">', 8);
    res.addStyle('<link rel="stylesheet" href="/css/partials/forms.css">', 7);
    res.addStyle('<link rel="stylesheet" href="/css/partials/tables.css">', 6);
    res.addStyle('<link rel="stylesheet" href="/css/partials/utilities.css">', 5);
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

// Account route
router.get('/profile', requireLogin, showProfile);

export default router;
