const {searchJokes} = require("./jokes_category_service");
const {searchStarWarsPeople} = require("./star_wars_people_service");

async function search(searchQuery) {
    const jokes = await searchJokes(searchQuery);
    const starWarsPeople = await searchStarWarsPeople(searchQuery);

    return {
        chuck: jokes,
        swapi: starWarsPeople
    }
}

module.exports = {
    search
};
