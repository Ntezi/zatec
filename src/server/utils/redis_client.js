const {createClient} = require('redis')
const { logger } = require('../utils/logging')(module);
const {
    REDIS_COMMAND_RPUSH,
    REDIS_COMMAND_LRANGE,
    REDIS_COMMAND_HSET,
    REDIS_COMMAND_HGET,
    REDIS_COMMAND_SET,
    REDIS_COMMAND_GET,
} = require("./constants");

let client;

async function init() {
    client = createClient({
        url: `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`,
        database: parseInt(process.env.REDIS_DATABASE, 10) || 0,
    });
    await client.connect();

}

async function cacheData(key, value, command) {
    try {
        if (command === REDIS_COMMAND_RPUSH){
            await client.RPUSH(key, value);
        }

        if (command === REDIS_COMMAND_HSET){
            await client.HSET(key, value);
        }

        if (command === REDIS_COMMAND_SET){
            await client.SET(key, value);
        }

        logger.info(`Redis setting value for key ${key}`);
    } catch (error) {
        logger.debug(`Redis setting value for key ${key} failed: ${error.message}`);
        throw new Error(`Error in saving value: ${error}.`);
    }
}

async function getCachedData(key, command) {
    let cachedData = null;
    try {
        if (command === REDIS_COMMAND_LRANGE){
            cachedData = await client.LRANGE(key, 0, -1)
        }

        if (command === REDIS_COMMAND_HGET){
            cachedData = await client.HGET(key);
        }

        if (command === REDIS_COMMAND_GET){
            cachedData = await client.GET(key);
        }

        logger.info(`Redis getting value for key ${key}`);
    } catch (error) {
        logger.debug(`Error in getting value for key ${key} failed: ${error.message}`);
        throw new Error(`Error in getting value: ${error}.`);
    }

    return cachedData;
}

async function keyExits(key) {
    let exits = false;
    try {
        exits = await client.EXISTS(key);
        if (exits){
            logger.info(`The key "${key}" exits`);
            return exits;
        } else {
            logger.info(`The key "${key}" does not exist`);
        }
    } catch (error) {
        logger.debug(`Error checking the key ${key}: ${error.message}`);
        throw new Error(`Error in getting value: ${error}.`);
    }
    return exits;
}

module.exports = {
    init, cacheData, getCachedData, keyExits
};
