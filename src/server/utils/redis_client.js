const {createClient} = require('redis')
const { logger } = require('../utils/logging')(module);

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
        if (command === 'RPUSH'){
            await client.RPUSH(key, value);
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
        if (command === 'LRANGE'){
            cachedData = await client.LRANGE(key, 0, -1)
        }

        logger.info(`Redis getting value for key ${key}`);
    } catch (error) {
        logger.debug(`Redis getting value for key ${key} failed: ${error.message}`);
        throw new Error(`Error in getting value: ${error}.`);
    }

    return cachedData;
}

module.exports = {
    init, cacheData, getCachedData
};
