const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

const requireAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        res.redirect('/');
    }
};

export { requireLogin, requireAdmin };