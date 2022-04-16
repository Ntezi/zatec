const {StatusCodes, ReasonPhrases} = require('http-status-codes');
const { logger } = require('../utils/logging')(module);
const { returnErrorResponse } = require('../utils/status');

module.exports = (req, res, next) => {
    if (req.headers.authorization === process.env.TOKEN) {
        next();
    } else {
        logger.error(`Authorization required on ${req.baseUrl}`);
        returnErrorResponse(res, ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }
};
