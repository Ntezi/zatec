const {searchJokes} = require("./jokes_category_service");
const {searchStarWarsPeople} = require("./star_wars_people_service");

async function search(searchCategory, searchPeople) {
    const jokes = await searchJokes(searchCategory);
    const starWarsPeople = await searchStarWarsPeople(searchPeople);

    return {
        chunk: jokes,
        swapi: starWarsPeople
    }
}

module.exports = {
    search
};
