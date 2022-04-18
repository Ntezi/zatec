const express = require('express');
const router = express.Router()
const {logger} = require('../utils/logging')(module);
const {returnErrorResponse, returnResponse} = require('../utils/status');
const {StatusCodes, ReasonPhrases} = require('http-status-codes');
const authenticate = require('../middlewares/authorization');
const {search} = require('../services/search_service');

router.get('/', authenticate, async (req, res) => {
    const {query} = req.query;
    console.log("req.query", req.query)
    try {
        logger.info(`Search Endpoint: GET /search`);
        const searchResults = await search(query);
        returnResponse(res, {data: searchResults}, StatusCodes.OK, ReasonPhrases.OK)
    } catch (error) {
        logger.error(`Error in GET /search: ${error.toString()}`);
        returnErrorResponse(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

module.exports = router;
