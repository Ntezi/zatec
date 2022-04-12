const {REDIS_KEY_SWAPI_PEOPLE, REDIS_COMMAND_LRANGE, REDIS_COMMAND_SET, REDIS_COMMAND_GET, REDIS_COMMAND_RPUSH, } = require("../utils/constants");
const RedisClient = require("../utils/redis_client");

async function cacheSwapiPeople(swapiPeopleData) {
    await RedisClient.cacheData(REDIS_KEY_SWAPI_PEOPLE, swapiPeopleData, REDIS_COMMAND_SET);
}

async function getCachedSwapiPeople() {
    const cachedSwapiPeople = await RedisClient.getCachedData(REDIS_KEY_SWAPI_PEOPLE, REDIS_COMMAND_GET);
    console.log('cachedSwapiPeople', cachedSwapiPeople);
    return cachedSwapiPeople
;
}

module.exports = {
    cacheSwapiPeople, getCachedSwapiPeople
};
