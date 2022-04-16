const cls = require('cls-hooked');
const { v4: uuidv4 } = require('uuid');

const appNamespace = cls.createNamespace('app');

module.exports = (req, res, next) => {
  appNamespace.bind(req);
  appNamespace.bind(res);

  const requestId = uuidv4();

  appNamespace.run(() => {
    appNamespace.set('requestId', requestId);
    appNamespace.set('path', req.path);
    appNamespace.set('method', req.method);
    next();
  });
};
