module.exports = {
  SUCCESS_MESSAGE: 'Successfully Saved Store Config',
  APPLICATION_JSON: 'application/json',
  HTTP_METHOD: {
    POST: "POST",
    GET: "GET",
    PATCH: "PATCH",
    PUT: "PUT",
  },
  JSON: "json",
  ACTION: {
    GENERATE_STORE_CONFIG: "GENERATE_STORE_CONFIG",
    UPDATE_STORE_CONFIG: "UPDATE_STORE_CONFIG"
  },
  EVENT: {
    '/store': {
      "POST": 'GENERATE_STORE_CONFIG'
    },
    '/store/{store_hash}': {
      "PUT": 'UPDATE_STORE_CONFIG'
    },
  },
  HEADERS: {
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,PUT,OPTIONS'
  },
  HTTP_ERROR: {
    INTERNAL_SERVER_ERROR: "Internal server error",
  }
}