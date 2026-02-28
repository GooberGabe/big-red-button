export const showForm = (req, res, next) => {
  try {
    res.render('contact', { title: 'Contact', submitted: false });
  } catch (error) {
    next(error);
  }
};

export const handleSubmit = (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).render('contact', {
        title: 'Contact',
        submitted: false,
        error: 'All fields are required.'
      });
    }

    res.render('contact', {
      title: 'Contact',
      submitted: true,
      name
    });
  } catch (error) {
    next(error);
  }
};
