export const showProfile = (req, res, next) => {
    try {
        const user = req.session.user;
        res.render('profile', { title: 'Profile', user });
    }
    catch(error) {
        next(error);
    }
    
}