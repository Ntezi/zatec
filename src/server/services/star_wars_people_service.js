const { getResults } = require('./get_results_helper');
const StarWarsPeopleAPI = require("../api/star_wars_people_api");
const StarWarsPeopleCache = require("../cache/star_wars_people_cache");

async function getStarWarsPeople() {
    const cachedStarWarsPeople = await StarWarsPeopleCache.getCachedStarWarsPeople();
    const starWarsPeopleAPI = await StarWarsPeopleAPI.getStarWarsPeopleAPI();

    if (cachedStarWarsPeople || starWarsPeopleAPI) {
        return getResults(cachedStarWarsPeople, starWarsPeopleAPI).results
    }
}

async function searchStarWarsPeople(searchQuery) {
    if (searchQuery) {
        const cachedStarWarsPeopleSearch = await StarWarsPeopleCache.getCachedStarWarsPeopleSearch(searchQuery);
        const searchStarWarsPeopleAPI = await StarWarsPeopleAPI.searchStarWarsPeopleAPI(searchQuery);

        if (cachedStarWarsPeopleSearch || searchStarWarsPeopleAPI) {
            return getResults(cachedStarWarsPeopleSearch, searchStarWarsPeopleAPI).results
        }
    }
}

module.exports = {
    getStarWarsPeople, searchStarWarsPeople
};
