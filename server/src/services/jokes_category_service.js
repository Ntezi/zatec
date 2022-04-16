const JokesCategoryAPI = require("../api/jokes_category_api");
const JokesCategoryCache = require("../cache/jokes_category_cache");
const { logger } = require('../utils/logging')(module);

async function getJokeCategories() {
    const cachedJokeCategories = await JokesCategoryCache.getCachedJokeCategories();

    let data;
    if (cachedJokeCategories.length > 0) {
        data = cachedJokeCategories;
        logger.info('Fetching from cache');
    } else {
        logger.info('Fetching from API');
        data = await JokesCategoryAPI.getJokeCategoriesAPI();
    }

    return data || [];
}

async function searchJokes(searchQuery) {
    if (searchQuery) {
        const cachedJokesData = await JokesCategoryCache.getCachedJokesData(searchQuery);

        let data;
        if (cachedJokesData) {
            data = JSON.parse(cachedJokesData);
            logger.info('Fetching from cache');
        } else {
            logger.info('Fetching from API');
            data = await JokesCategoryAPI.searchJokesByCategoryAPI(searchQuery);
        }

        return data.result;
    }
}

module.exports = {
    getJokeCategories, searchJokes
};
