const RedisClient = require("../utils/redis_client");
const Constants = require("../utils/constants");

function getJokeCategoryKey(){
    return Constants.REDIS_KEY_JOKES_CATEGORY;
}

function getSearchJokeCategoryKey(searchQuery){
    return `${Constants.REDIS_KEY_JOKES_CATEGORY_SEARCH}:${searchQuery}:1`
}

async function cacheJokeCategories(jokeCategoriesData) {
    await RedisClient.cacheData(getJokeCategoryKey(), jokeCategoriesData, Constants.REDIS_COMMAND_RPUSH);
}

async function cacheJokesData(jokesData, searchQuery) {
    const key = getSearchJokeCategoryKey(searchQuery);
    await RedisClient.cacheData(key, jokesData, Constants.REDIS_COMMAND_SET);
}

async function getCachedJokeCategories() {
    if (await RedisClient.keyExits(getJokeCategoryKey())) {
        const cachedJokeCategories = await RedisClient.getCachedData(getJokeCategoryKey(), Constants.REDIS_COMMAND_LRANGE);
        console.log("cachedJokeCategories", cachedJokeCategories);
        return  cachedJokeCategories.length > 0 ? cachedJokeCategories.join(' ').split(' ') : [];
    }
    return [];
}

async function getCachedJokesData(searchQuery) {
    const key = getSearchJokeCategoryKey(searchQuery);
    if (await RedisClient.keyExits(key)) {
        return await RedisClient.getCachedData(key, Constants.REDIS_COMMAND_GET);
    }
}

module.exports = {
    cacheJokeCategories, getCachedJokeCategories, cacheJokesData, getCachedJokesData
};
