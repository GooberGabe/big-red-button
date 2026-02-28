export const showCreateForm = (req, res, next) => {
  try {
    res.render('account-create', { title: 'Create Account', submitted: false });
  } catch (error) {
    next(error);
  }
};

export const handleCreate = (req, res, next) => {
  try {
    const { email, username } = req.body;
    if (!email || !username) {
      return res.status(400).render('account-create', {
        title: 'Create Account',
        submitted: false,
        error: 'Email and username are required.'
      });
    }

    res.render('account-create', {
      title: 'Create Account',
      submitted: true,
      email,
      username
    });
  } catch (error) {
    next(error);
  }
};
