const {makeRequest} = require("../utils/http");

async function callApi(url) {
    const response = await makeRequest(url);
    if (!response) {
        return null;
    }
    return response.data;
}

module.exports = {
    callApi
};
