const { makeRequest } = require('../utils/http');
const { logger } = require('../utils/logging')(module);
const {JOKE_CATEGORIES_API} = require("../utils/constants");
const {cacheJokeCategories} = require("../cache/joke_categories_cache");

async function getJokeCategoriesAPI() {
    try {
        const jokeCategories = await makeRequest(JOKE_CATEGORIES_API);

        // Caching the results
        if (jokeCategories.data){
            const jokeCategoriesData = jokeCategories.data.join(' ');
            await cacheJokeCategories(jokeCategoriesData);
        }
        return jokeCategories.data
    } catch (error) {
        logger.error(`Failed to get jokes categories: ${error.toString()}`);
        throw new Error(`Failed to get jokes categories: ${error.toString()}`);
    }
}

module.exports = {
    getJokesCategoriesAPI: getJokeCategoriesAPI
};
