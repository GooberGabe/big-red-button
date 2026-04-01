import { body, validationResult } from 'express-validator';
import { getUserByEmail, verifyPassword } from '../../models/accounts/accountModel.js';

export const loginValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password is required')
];

export const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login', errors: [], formData: {} });
};

export const processLogin = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach(err => req.flash('error', err.msg));
        return res.redirect('/login');
    }

    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email)
        if (!user) {
            req.flash('error', 'No account found with that email.');
            return res.redirect('/login');
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            req.flash('error', 'Incorrect password.');
            return res.redirect('/login');
        }

        delete user.password;

        req.session.user = user;
        req.flash('success', 'Login successful!');
        return res.redirect('/');
    } catch (error) {
        console.error('Error during login process:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        return res.redirect('/login');
    }
};

export const processLogout = (req, res) => {
    if (!req.session) {
        return res.redirect('/');
    }

    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.clearCookie('connect.sid');
            return res.redirect('/');
        }

        res.clearCookie('connect.sid');
        res.redirect('/');
    });
};