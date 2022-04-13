const { callApi } = require('./call_api');
const { logger } = require('../utils/logging')(module);
const Constants = require("../utils/constants");
const JokeCategoriesCache = require("../cache/jokes_category_cache");

async function getJokeCategoriesAPI() {
    try {
        const jokeCategoriesEndpointUrl = `${Constants.JOKES_CATEGORY_API}/categories`;
        const jokeCategories = await callApi(jokeCategoriesEndpointUrl);

        // Caching the results
        if (jokeCategories.length > 0){
            const jokeCategoriesData = jokeCategories.join(' ');
            await JokeCategoriesCache.cacheJokeCategories(jokeCategoriesData);
            return jokeCategories
        }
    } catch (error) {
        logger.error(`Failed to get jokes: ${error.toString()}`);
        throw new Error(`Failed to get jokes: ${error.toString()}`);
    }

    return [];
}

async function searchJokesByCategoryAPI(searchQuery) {
    try {
        const searchJokeCategoriesEndpointUrl = `${Constants.JOKES_CATEGORY_API}/search?query=${searchQuery}`;
        const jokes = await callApi(searchJokeCategoriesEndpointUrl);

        // Caching the results
        if (jokes){
            const jokesData = JSON.stringify(jokes);
            await JokeCategoriesCache.cacheJokesData(jokesData, searchQuery);
            return jokes
        }
    } catch (error) {
        logger.error(`Failed to get jokes categories: ${error.toString()}`);
        throw new Error(`Failed to get jokes categories: ${error.toString()}`);
    }
}

module.exports = {
    getJokeCategoriesAPI, searchJokesByCategoryAPI
};
