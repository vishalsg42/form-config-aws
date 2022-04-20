"use strict";

exports.handler = async (event) => {
  console.log("event", JSON.stringify(event, null,2));
  return {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Go Serverless v2.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
