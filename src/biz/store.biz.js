const S3Biz = require("./helpers/s3.biz");
const RequestValidator = require('../validators/request.validator');
const APP_CONSTANTS = require("../constants/appConstants");
const { SAVE_STORE_CONFIG } = require('../schema/schema-suit');

class StoreBiz {

  constructor() {
    this.s3Biz = new S3Biz();
  }
  saveStoreConfig(payload) {
    return new Promise(async (resolve, reject) => {
      let response = {
        result: false
      }
      try {
        let {
          body,
        } = payload;
        body = JSON.parse(body);


        // payload validation
        const validator = new RequestValidator(SAVE_STORE_CONFIG);
        validator.create(body);

        const storeObjectPath = `${body.store_hash}.${APP_CONSTANTS.JSON}`;

        // Checking if store config already exist
        let checkIfFileExist = await this.checkIfFileExist(storeObjectPath);

        if (checkIfFileExist) {
          return resolve(response);
        }

        const s3ObjectName = storeObjectPath;
        await this.s3Biz.putBase64Object(
          s3ObjectName,
          Buffer.from(JSON.stringify(body)),
          APP_CONSTANTS.APPLICATION_JSON
        );

        response.result = true
        response.payload = body;
        response.data = { url : `https://${process.env.STORE_BUCKET_NAME}.s3.amazonaws.com/${storeObjectPath}`};

        resolve(response);
      } catch (error) {
        console.error("error while saving store config", error);
        reject(error);
      }
    })
  }

  checkIfFileExist(storeObjectPath) {
    return new Promise(async (resolve, reject) => {
      try {
        let checkIfFileExist = false;
        try {
          await this.s3Biz.getObject(storeObjectPath);
          checkIfFileExist = true;
        } catch (error) {
          checkIfFileExist = false;
        }
        console.log("checkIfFileExist", checkIfFileExist);
        return resolve(checkIfFileExist);
      } catch (error) {
        console.error("Error while checking fille if exist", error);
        return reject(errror);
      }
    })
  }

  updateStoreConfig(payload) {
    return new Promise(async (resolve, reject) => {
      let response = {
        result: false
      }
      try {
        let {
          body
        } = payload;
        body = JSON.parse(body);


        // payload validation
        const validator = new RequestValidator(SAVE_STORE_CONFIG);
        validator.create(body);

        const storeObjectPath = `${body.store_hash}.${APP_CONSTANTS.JSON}`;

        // Checking if store config already exist
        let checkIfFileExist = await this.checkIfFileExist(storeObjectPath);

        if (!checkIfFileExist) {
          return resolve(response);
        }

        let data = await this.s3Biz.getObject(storeObjectPath);
        if(data) {
          try {
            data = JSON.parse(data.Body.toString())
          } catch (er) {
            data = {}
          }
        }

        // saving payload
        body = {
          ...data,
          ...body
        }

        // saving payload
        const s3ObjectName = storeObjectPath;
        await this.s3Biz.putBase64Object(
          s3ObjectName,
          Buffer.from(JSON.stringify(body)),
          APP_CONSTANTS.APPLICATION_JSON
        );

        response.result = true
        response.payload = body;
        response.data = { url : `https://${process.env.STORE_BUCKET_NAME}.s3.amazonaws.com/${storeObjectPath}`};
        resolve(response);
      } catch (error) {
        console.error("error while updating store config", error);
        reject(error);
      }
    })
  }
}

module.exports = StoreBiz;