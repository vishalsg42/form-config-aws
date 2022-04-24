const { HEADERS } = require("../constants/appConstants");

module.exports = {
  generateResponsePayload: (statusCode = 200, headers = {}, body = "") => {
    return {
      statusCode,
      'headers': { ...HEADERS, ...headers },
      body: JSON.stringify(body),
    }
  }
}