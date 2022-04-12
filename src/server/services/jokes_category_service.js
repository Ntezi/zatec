const { getResults } = require('./get_results_helper');
const JokesCategoryAPI = require("../api/jokes_category_api");
const JokesCategoryCache = require("../cache/jokes_category_cache");
const { logger } = require('../utils/logging')(module);

async function getJokeCategories() {
    const cachedJokeCategories = await JokesCategoryCache.getCachedJokeCategories();
    const jokeCategoriesAPI = await JokesCategoryAPI.getJokeCategoriesAPI();

    let jokesCategories;
    if (cachedJokeCategories.length > 0) {
        jokesCategories = cachedJokeCategories;
        logger.info('Fetching from cache');
    } else {
        logger.info('Fetching from API');
        jokesCategories = jokeCategoriesAPI;
    }

    return jokesCategories || [];

}

async function searchJokeCategory(searchQuery) {
    if (searchQuery) {
        const cachedJokesData = await JokesCategoryCache.getCachedJokesData(searchQuery);
        const searchJokesByCategoryAPI = await JokesCategoryAPI.searchJokesByCategoryAPI(searchQuery);

        if (cachedJokesData || searchJokesByCategoryAPI) {
            return getResults(cachedJokesData, searchJokesByCategoryAPI).result;
        }
    }

    return {};
}

module.exports = {
    getJokeCategories, searchJokeCategory
};
