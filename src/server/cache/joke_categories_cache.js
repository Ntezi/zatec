const {REDIS_KEY_CHUCK_JOKE_CATEGORIES, REDIS_COMMAND_RPUSH, REDIS_COMMAND_LRANGE, } = require("../utils/constants");
const RedisClient = require("../utils/redis_client");

async function cacheJokeCategories(jokeCategoriesData) {
    await RedisClient.cacheData(REDIS_KEY_CHUCK_JOKE_CATEGORIES, jokeCategoriesData, REDIS_COMMAND_RPUSH);
}

async function getCachedJokeCategories() {
    const cachedJokeCategories = await RedisClient.getCachedData(REDIS_KEY_CHUCK_JOKE_CATEGORIES, REDIS_COMMAND_LRANGE);
    return  cachedJokeCategories.length > 0 ? cachedJokeCategories.join(' ').split(' ') : [];
}

module.exports = {
    cacheJokeCategories, getCachedJokeCategories
};
