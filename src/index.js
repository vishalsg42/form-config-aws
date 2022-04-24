"use strict";
const { EVENT, ACTION, HEADERS, HTTP_ERROR, SUCCESS_MESSAGE } = require("./constants/appConstants");
const StoreBiz = require("./biz/store.biz");
const { generateResponsePayload } = require("./utils/helpers.utils");

exports.handler = async (event) => {
  let response = {};
  try {
    console.log("event", JSON.stringify(event, null, 2));
    const storeBiz = new StoreBiz();
    switch (EVENT[event.resource][event.httpMethod]) {
      case ACTION.GENERATE_STORE_CONFIG:
        let storeResponse = await storeBiz.saveStoreConfig({ ...event, body: event.body });
        if (storeResponse.result) {
          response = generateResponsePayload(200, {}, {
            success: true,
            message: SUCCESS_MESSAGE,
            data: storeResponse.data
          });
        } else {
          response = generateResponsePayload(400, {}, {
            success: false,
            message: "store config already exist",
          })
        }
        break;
      case ACTION.UPDATE_STORE_CONFIG:
        let storeSavedResponse = await storeBiz.updateStoreConfig({ ...event, body: event.body, storehash: event.pathParameters });
        if (storeSavedResponse.result) {
          response = generateResponsePayload(200, {}, {
            success: true,
            message: SUCCESS_MESSAGE,
            data :  storeSavedResponse.data
          })
        } else {
          response = generateResponsePayload(400, {}, {
            success: false,
            message: "store config already exist",
          })
        }
        console.log("hello update");
        break;
      default:
        console.log("defailt");
        break;
    }
  } catch (error) {
    response = generateResponsePayload(error.status || 500, {}, {
      success: false,
      ...(typeof error == "object" && { error }),
      // message: error.code || HTTP_ERROR.INTERNAL_SERVER_ERROR,
      // ...(error.fields && { fields: error.fields })
    })
  }
  console.log("response", JSON.stringify(response, null, 2));
  return response;
};
