const RedisClient = require("../utils/redis_client");
const Constants = require("../utils/constants");

function getStarWarsPeopleKey(){
    return Constants.REDIS_KEY_SW_PEOPLE;
}

function getSearchStarWarsPeopleKey(searchQuery) {
    return `${Constants.REDIS_KEY_SW_PEOPLE_SEARCH}:${searchQuery}:1`
}

async function cacheStarWarsPeople(starWarsPeopleData) {
    await RedisClient.cacheData(getStarWarsPeopleKey(), starWarsPeopleData, Constants.REDIS_COMMAND_SET);
}

async function cacheStarWarsPeopleSearch(starWarsPeopleData, searchQuery) {
    const key = getSearchStarWarsPeopleKey(searchQuery)
    await RedisClient.cacheData(key, starWarsPeopleData, Constants.REDIS_COMMAND_SET);
}

async function getCachedStarWarsPeople() {
    if (await RedisClient.keyExits(getStarWarsPeopleKey())) {
        return await RedisClient.getCachedData(getStarWarsPeopleKey(), Constants.REDIS_COMMAND_GET);
    }
}

async function getCachedStarWarsPeopleSearch(searchQuery) {
    const key = getSearchStarWarsPeopleKey(searchQuery);
    if (await RedisClient.keyExits(key)) {
        return await RedisClient.getCachedData(key, Constants.REDIS_COMMAND_GET);
    }
}

module.exports = {
    cacheStarWarsPeople, getCachedStarWarsPeople, getCachedStarWarsPeopleSearch, cacheStarWarsPeopleSearch
};
