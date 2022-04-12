const  JOKES_CATEGORY_API= 'https://api.chucknorris.io/jokes';
const  SW_PEOPLE_API= 'https://swapi.dev/api/people';

const  REDIS_KEY_JOKES_CATEGORY= 'jokes:category:1';
const  REDIS_KEY_JOKES_CATEGORY_SEARCH= 'jokes:category:search';
const  REDIS_KEY_SW_PEOPLE= 'sw:people:1';
const  REDIS_KEY_SW_PEOPLE_SEARCH= 'sw:people:search';

const  REDIS_COMMAND_RPUSH= 'RPUSH';
const  REDIS_COMMAND_LRANGE= 'LRANGE';
const  REDIS_COMMAND_HSET= 'HSET';
const  REDIS_COMMAND_HGET= 'HGET';
const  REDIS_COMMAND_SET= 'SET';
const  REDIS_COMMAND_GET= 'GET';
const  REDIS_COMMAND_EXISTS= 'EXISTS';


module.exports = {
  JOKES_CATEGORY_API,
  SW_PEOPLE_API,

  REDIS_KEY_JOKES_CATEGORY,
  REDIS_KEY_JOKES_CATEGORY_SEARCH,
  REDIS_KEY_SW_PEOPLE,
  REDIS_KEY_SW_PEOPLE_SEARCH,

  REDIS_COMMAND_RPUSH,
  REDIS_COMMAND_LRANGE,
  REDIS_COMMAND_HSET,
  REDIS_COMMAND_HGET,
  REDIS_COMMAND_SET,
  REDIS_COMMAND_GET,
  REDIS_COMMAND_EXISTS,
};
