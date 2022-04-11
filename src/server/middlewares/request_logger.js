const { logger } = require('../utils/logging')(module);

module.exports = (req, res, next) => {
  logger.info(`incoming HTTP request from ip: ${req.ip} ${req.method} ${req.path} user-agent: ${req.get('User-Agent')}`);

  res.on('timeout', (socket) => {
    logger.error(`request ${req.method} ${req.path} timed out after ${socket.timeout} ms`);
  });

  res.on('close', () => {
    logger.info(`connection ended for request ${req.method} ${req.path}`);
  });

  res.on('finish', () => {
    logger.info(`request ${req.method} ${req.path} finished with status code: ${res.statusCode} duration: ${req.timing.duration} ms`);
  });

  next();
};
