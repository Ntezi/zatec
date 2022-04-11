const express = require('express');
const router = express.Router()
const { logger } = require('../utils/logging')(module);
const { returnErrorResponse, returnResponse } = require('../utils/status');
const {StatusCodes, ReasonPhrases} = require('http-status-codes');
const authenticate = require('../middlewares/authorization');

router.get('/', authenticate, async (req, res) => {
    logger.info(`Search Endpoint: GET /search`);
    try {

        returnResponse(res, [], StatusCodes.OK, ReasonPhrases.OK)
    } catch (error) {
        logger.error(`Error in GET /search: ${error.toString()}`);
        returnErrorResponse(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

module.exports = router;
