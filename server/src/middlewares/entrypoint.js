const clsMiddleware = require('./cls_middleware');
const timing = require('./timing');
const requestLogger = require('./request_logger');
const cors = require('cors');
const helmet = require("helmet");
const cacheControl = require('./cache_control');
const requestId = require('./request_id');

function init(app) {
  app.use(clsMiddleware);
  app.use(requestId);
  app.use(timing);
  app.use(requestLogger);
  app.use(cors());
  app.use(helmet());
  app.use(cacheControl);
}

module.exports.init = init;
