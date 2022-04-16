const express = require('express');
const router = express.Router()
const {logger} = require('../utils/logging')(module);
const {returnErrorResponse, returnResponse} = require('../utils/status');
const {StatusCodes, ReasonPhrases} = require('http-status-codes');
const authenticate = require('../middlewares/authorization');
const JokesCategoryService = require('../services/jokes_category_service');

router.get('/categories/', authenticate, async (req, res) => {
    try {
        logger.info(`Chuck Endpoint: GET /chuck/categories`);
        const jokesCategories = await JokesCategoryService.getJokeCategories();
        returnResponse(res, {data: jokesCategories}, StatusCodes.OK, ReasonPhrases.OK)
    } catch (error) {
        logger.error(`Error in GET /chuck/categories: ${error.toString()}`);
        returnErrorResponse(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
});

module.exports = router;
