const {logger} = require('../utils/logging')(module);

function getResults(cachedData, apiData) {
    let results;
    if (cachedData) {
        results = JSON.parse(cachedData);
        logger.info('Fetching from cache');
    } else {
        logger.info('Fetching from API');
        results = apiData;
    }

    return results;
}

module.exports = {
    getResults
};
