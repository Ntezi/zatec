const express = require('express');
const router = express.Router()
const {logger} = require('../utils/logging')(module);
const {returnErrorResponse, returnResponse} = require('../utils/status');
const {StatusCodes, ReasonPhrases} = require('http-status-codes');
const authenticate = require('../middlewares/authorization');
const StarWarsPeopleService = require('../services/star_wars_people_service');

router.get('/people', authenticate, async (req, res) => {
    try {
        logger.info(`SWAPI Endpoint: GET /swapi/people`);
        const starWarsPeople = await StarWarsPeopleService.getStarWarsPeople();
        returnResponse(res, {data: starWarsPeople}, StatusCodes.OK, ReasonPhrases.OK)
    } catch (error) {
        logger.error(`Error in GET /swapi/people: ${error.toString()}`);
        returnErrorResponse(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

module.exports = router;
