module.exports = (req, res, next) => {
  res.set('Cache-Control', 'max-age=0');
  next();
};

