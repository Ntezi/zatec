const express = require('express');
const router = express.Router()
const { logger } = require('../utils/logging')(module);
const { returnErrorResponse, returnResponse } = require('../utils/status');
const {StatusCodes, ReasonPhrases} = require('http-status-codes');
const authenticate = require('../middlewares/authorization');

router.get('/', authenticate, async (req, res) => {
    logger.info(`SWAPI Endpoint: GET /swapi`);
    try {

        returnResponse(res, [], StatusCodes.OK, ReasonPhrases.OK)
    } catch (error) {
        logger.error(`Error in GET /swapi: ${error.toString()}`);
        returnErrorResponse(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

module.exports = router;
