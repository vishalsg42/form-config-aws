const { SchemaException } = require('../exceptions');

class BaseValidator {
	prepareValidationErrorObj(validatorResult) {
		try {
			if (!validatorResult.valid) {
				if (validatorResult.schema && validatorResult.schema.message) validatorResult.errors.message = validatorResult.schema.message;
				throw new SchemaException(validatorResult.errors);
			}
		} catch (error) {
			throw error;
		}
	}
}

module.exports = BaseValidator;
