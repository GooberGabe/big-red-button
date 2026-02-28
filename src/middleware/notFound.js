const notFound = (req, res, next) => {
  res.status(404).render('404', {
    title: 'Not Found',
    message: 'The page you are looking for does not exist.'
  });
};

export default notFound;
