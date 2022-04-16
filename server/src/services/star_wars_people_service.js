const StarWarsPeopleAPI = require("../api/star_wars_people_api");
const StarWarsPeopleCache = require("../cache/star_wars_people_cache");
const {logger} = require('../utils/logging')(module);

async function getStarWarsPeople() {
    const cachedStarWarsPeople = await StarWarsPeopleCache.getCachedStarWarsPeople();
    let data;
    if (cachedStarWarsPeople) {
        data = JSON.parse(cachedStarWarsPeople);
        logger.info('Fetching from cache');
    } else {
        logger.info('Fetching from API');
        data = await StarWarsPeopleAPI.getStarWarsPeopleAPI();
    }

    return data.results;
}

async function searchStarWarsPeople(searchQuery) {
    if (searchQuery) {
        const cachedStarWarsPeopleSearch = await StarWarsPeopleCache.getCachedStarWarsPeopleSearch(searchQuery);

        let data;
        if (cachedStarWarsPeopleSearch) {
            data = JSON.parse(cachedStarWarsPeopleSearch);
            logger.info('Fetching from cache');
        } else {
            logger.info('Fetching from API');
            data = await StarWarsPeopleAPI.searchStarWarsPeopleAPI(searchQuery);
        }

        return data.results;
    }
}

module.exports = {
    getStarWarsPeople, searchStarWarsPeople
};
