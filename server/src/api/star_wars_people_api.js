const {callApi} = require('./call_api');
const {logger} = require('../utils/logging')(module);
const Constants = require("../utils/constants");
const StarWarsPeopleCache = require("../cache/star_wars_people_cache");

function getPeopleWithNextPageAPI(url, people, resolve, reject) {
    callApi(url)
        .then(response => {
            const data = people.concat(response.results)
            if (response.next !== null) {
                getPeopleWithNextPageAPI(response.next, data, resolve, reject)
            } else {
                resolve(data)
            }
        })
        .catch(error => {
            logger.error(`Failed to get star wars people: ${error.toString()}`);
            reject('Something wrong. Please refresh the page and try again.')
        })
}

function getStarWarsPeopleAPI() {
    return new Promise((resolve, reject) => {
        getPeopleWithNextPageAPI(Constants.SW_PEOPLE_API, [], resolve, reject)
    }).then(async response => {

        // Caching the results
        if (response) {
            const starWarsPeopleData = JSON.stringify(response);
            await StarWarsPeopleCache.cacheStarWarsPeople(starWarsPeopleData);
            return JSON.parse(starWarsPeopleData);
        }
    })
}

async function searchStarWarsPeopleAPI(searchQuery) {
    try {
        const searchStarWarsPeopleEndpointUrl = `${Constants.SW_PEOPLE_API}/?search=${searchQuery}`;
        const starWarsPeople = await callApi(searchStarWarsPeopleEndpointUrl);

        // Caching the results
        if (starWarsPeople) {
            const searchStarWarsPeopleData = JSON.stringify(starWarsPeople);
            await StarWarsPeopleCache.cacheStarWarsPeopleSearch(searchStarWarsPeopleData, searchQuery);
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
