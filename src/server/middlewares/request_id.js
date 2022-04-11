const { getNamespace } = require('cls-hooked');

module.exports = (req, res, next) => {
  const appNamespace = getNamespace('app');
  const requestId = appNamespace.get('requestId');

  res.setHeader('X-RequestId', requestId || 'GLOBAL');
  next();
};
