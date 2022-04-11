const {getJokesCategoriesAPI} = require("../api/joke_categories_api");
const {getCachedJokeCategories} = require("../cache/joke_categories_cache");
const {REDIS_KEY_CHUCK_JOKE_CATEGORIES} = require("../utils/constants");
const { logger } = require('../utils/logging')(module);

async function getJokesCategories() {
    let jokesCategories
    const cachedJokeCategories = await getCachedJokeCategories(REDIS_KEY_CHUCK_JOKE_CATEGORIES);

    if (cachedJokeCategories.length > 0) {
        jokesCategories = cachedJokeCategories;
        logger.info('Fetching from cache');
    } else {
        logger.info('Fetching from API');
        jokesCategories = await getJokesCategoriesAPI();
    }

    return jokesCategories || null;
}

module.exports = {
    getJokesCategories
};
