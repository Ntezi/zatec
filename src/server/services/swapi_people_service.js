const {getSwapiPeopleAPI} = require("../api/swapi_people_api");
const {getCachedSwapiPeople} = require("../cache/swapi_people_cache");
const {REDIS_KEY_SWAPI_PEOPLE} = require("../utils/constants");
const { logger } = require('../utils/logging')(module);

async function getSwapiPeople() {
    let swapiPeople
    const cachedSwapiPeople = await getCachedSwapiPeople(REDIS_KEY_SWAPI_PEOPLE);
    if (cachedSwapiPeople) {
        swapiPeople = JSON.parse(cachedSwapiPeople);
        logger.info('Fetching from cache');
    } else {
        logger.info('Fetching from API');
        swapiPeople = await getSwapiPeopleAPI();
    }

    return swapiPeople.results || null;
}

module.exports = {
    getSwapiPeople
};
