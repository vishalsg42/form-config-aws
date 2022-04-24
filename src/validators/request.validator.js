const BaseValidator = require('./base.validator');
const SchemaValidator = require('jsonschema').Validator;

class RequestValidator extends BaseValidator {
	constructor(schema) {
		super();
		this.schema = schema;
	}
	create(data) {
		try {
			const schemaValidator = new SchemaValidator();
			super.prepareValidationErrorObj(schemaValidator.validate(data, this.schema));
		} catch (error) {
			throw error;
		}
	}
}

module.exports = RequestValidator;
