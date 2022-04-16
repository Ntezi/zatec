const url = require('url');

module.exports = (req, res, next) => {
  const host = url.format({ protocol: req.headers['x-forwarded-proto'] || req.protocol, host: req.get('host') });
  const { pathname } = new url.URL(req.originalUrl, host);

  req.thisUrl = url.format({ host, pathname });

  next();
};
