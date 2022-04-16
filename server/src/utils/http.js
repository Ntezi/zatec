const _ = require('lodash');
const axios = require('axios');
const uuid = require('uuid');
const { logger } = require('./logging')(module);

function makeRequest(url, options = {}, method = 'GET') {
  const requestId = uuid.v4();

  logger.info(`Outgoing request ${method} ${url}, id: ${requestId}, options: ${JSON.stringify(options)}`);

  const startTime = Date.now();

  return axios.request({
    url,
    method,
    ...options
  }).then((res) => {
    const endTime = Date.now();
    logger.info(`Request with id: ${requestId} finished with status code ${res.status}, received bytes: ${res.headers['content-length']} in: ${endTime - startTime} ms`);
    return res;
  }).catch((error) => {
    const endTime = Date.now();
    logger.error(`Request with id: ${requestId} failed with status code ${_.get(error, 'response.status', 'NA')} and message - ${JSON.stringify(_.get(error, 'response.data', 'NA'))} in: ${endTime - startTime} ms`);
    throw error;
  });
}

module.exports = {
  makeRequest
};
