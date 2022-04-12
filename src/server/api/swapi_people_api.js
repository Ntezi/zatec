const { makeRequest } = require('../utils/http');
const { logger } = require('../utils/logging')(module);
const {SWAPI_PEOPLE_API} = require("../utils/constants");
const {cacheSwapiPeople} = require("../cache/swapi_people_cache");

async function getSwapiPeopleAPI() {
    try {
        const swapiPeople = await makeRequest(SWAPI_PEOPLE_API);

        // Caching the results
        if (swapiPeople.data){
            const swapiPeopleData = JSON.stringify(swapiPeople.data);
            await cacheSwapiPeople(swapiPeopleData);
        }
        return swapiPeople.data
    } catch (error) {
        logger.error(`Failed to get star wars people: ${error.toString()}`);
        throw new Error(`Failed to get star wars people: ${error.toString()}`);
    }
}

module.exports = {
    getSwapiPeopleAPI
};
