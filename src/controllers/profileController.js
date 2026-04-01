export const showProfile = (req, res) => {
    try {
        const user = req.session.user;
        res.render('profile', { title: 'Profile', user });
    }
    catch(err) {
        next(err);
    }
    
}