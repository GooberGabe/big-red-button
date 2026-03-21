const NODE_ENV = process.env.NODE_ENV;

const errorHandler = (err, req, res, next) => {
  if (res.headersSent || res.finished) {
    return next(err);
  }
  console.error(err);
  const status = err.status || 500;
  const template = status === 404 ? '404' : '500';

  // Prepare data for the template
  const context = {
    title: status === 404 ? 'Page Not Found' : 'Server Error',
    error: NODE_ENV === 'production' ? 'An error occurred' : err.message,
    stack: NODE_ENV === 'production' ? null : err.stack,
    NODE_ENV // Our WebSocket check needs this and its convenient to pass along
  };

  /*
  const message = err.message || 'Something went wrong';
  res.status(status).render('error', {
    title: 'Error',
    message
  });
  */

  try {
    res.status(status).render(`errors/${template}`, context);
  } catch (renderErr) {
    if (!res.headersSent) {
      res.status(status).send(`<h1>Error ${status}</h1><p>An error occurred.</p>`);
    }
  }
};

export default errorHandler;
