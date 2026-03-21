const addLocalVariables = (req, res, next) => {
  res.locals.NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
  res.locals.queryParams = req.query || {};
  
  next();
}

export default addLocalVariables;