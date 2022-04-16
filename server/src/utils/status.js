const { getNamespace } = require('cls-hooked');
function getRequestInfo() {
  const appNamespace = getNamespace('app');
  const request_id = (appNamespace && appNamespace.get('requestId')) || 'GLOBAL';
  const path = (appNamespace && appNamespace.get('path')) || '';
  const method = (appNamespace && appNamespace.get('method')) || '';
  return {
    request_id: request_id,
    path: path,
    method: method
  };
}
function returnResponse(res, data, status_code, message) {
  const request_info = getRequestInfo();
  const response_object = {
    status_code: status_code,
    message: message,
    ...data,
    request_id: request_info.request_id
  };
  res.status(status_code).json(response_object);
}

function returnErrorResponse(res, error, status_code) {
  const request_info = getRequestInfo();
  const response_object = {
    status_code: status_code,
    message: `Error in ${request_info.method} ${request_info.path}`,
    error: error,
    request_id: request_info.request_id
  };
  res.status(status_code).json(response_object);
}
module.exports = {
  returnResponse,
  returnErrorResponse
};
