const { callApi } = require('./call_api');
const { logger } = require('../utils/logging')(module);
const Constants = require("../utils/constants");
const StarWarsPeopleCache = require("../cache/star_wars_people_cache");

async function getStarWarsPeopleAPI() {
    try {
        const starWarsPeople = await callApi(Constants.SW_PEOPLE_API);

        // Caching the results
        if (starWarsPeople){
            const starWarsPeopleData = JSON.stringify(starWarsPeople);
            await StarWarsPeopleCache.cacheStarWarsPeople(starWarsPeopleData);
            return JSON.parse(starWarsPeopleData);
        }
    } catch (error) {
        logger.error(`Failed to get star wars people: ${error.toString()}`);
        throw new Error(`Failed to get star wars people: ${error.toString()}`);
    }
}

async function searchStarWarsPeopleAPI(searchQuery) {
    try {
        const searchStarWarsPeopleEndpointUrl = `${Constants.SW_PEOPLE_API}/?search=${searchQuery}`;
        const starWarsPeople = await callApi(searchStarWarsPeopleEndpointUrl);
        
        // Caching the results
        if (starWarsPeople){
            const searchStarWarsPeopleData = JSON.stringify(starWarsPeople);
            await  StarWarsPeopleCache.cacheStarWarsPeopleSearch(searchStarWarsPeopleData, searchQuery);
            return starWarsPeople
        }
    } catch (error) {
        logger.error(`Failed to get star wars people: ${error.toString()}`);
        throw new Error(`Failed to get star wars people: ${error.toString()}`);
    }
}

module.exports = {
    getStarWarsPeopleAPI, searchStarWarsPeopleAPI
};
