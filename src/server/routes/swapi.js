const express = require('express');
const router = express.Router()
const {logger} = require('../utils/logging')(module);
const {returnErrorResponse, returnResponse} = require('../utils/status');
const {StatusCodes, ReasonPhrases} = require('http-status-codes');
const authenticate = require('../middlewares/authorization');
const {getSwapiPeople} = require('../services/swapi_people_service');

router.get('/people', authenticate, async (req, res) => {
    try {
        logger.info(`Chuck Endpoint: GET /swapi/people`);
        const swapiPeople = await getSwapiPeople();
        returnResponse(res, {data: swapiPeople}, StatusCodes.OK, ReasonPhrases.OK)
    } catch (error) {
        logger.error(`Error in GET /swapi/people: ${error.toString()}`);
        returnErrorResponse(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

module.exports = router;
