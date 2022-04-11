const  JOKE_CATEGORIES_API= 'https://api.chucknorris.io/jokes/categories';
const  REDIS_KEY_CHUCK_JOKE_CATEGORIES= 'chuck:joke:categories:1';
const  REDIS_COMMAND_RPUSH= 'RPUSH';
const  REDIS_COMMAND_LRANGE= 'LRANGE';


module.exports = {
  JOKE_CATEGORIES_API,
  REDIS_KEY_CHUCK_JOKE_CATEGORIES,
  REDIS_COMMAND_RPUSH,
  REDIS_COMMAND_LRANGE,
};
