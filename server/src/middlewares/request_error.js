const {StatusCodes} = require("http-status-codes");
const { returnErrorResponse } = require('../utils/status');
const { logger } = require('../utils/logging')(module);

module.exports = (err, req, res, next) => {
  logger.error('Request Error', err.toString());
  returnErrorResponse(res, err, StatusCodes.INTERNAL_SERVER_ERROR);
};
