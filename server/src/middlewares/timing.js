module.exports = (req, res, next) => {
  req.timing = {
    start: new Date()
  };

  res.on('finish', () => {
    req.timing.end = new Date();
    req.timing.duration = req.timing.end - req.timing.start;
  });

  next();
};
