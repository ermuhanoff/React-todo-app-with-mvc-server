const { clientError, serverError } = require('./constants.js');
const { statusCodes } = require('../responses/constants.js');

class BaseError extends Error {
  constructor(message, status, errors = []) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static createUnauthorizedError() {
    return new BaseError(
      clientError.messages.UNAUTHORIZED,
      statusCodes.errors.UNAUTHORIZED
    );
  }

  static createInternalServerError() {
    return new BaseError(
      serverError.messages.INTERNAL_ERROR,
      statusCodes.errors.INTERNAL_ERROR
    );
  }

  static createBadRequestError() {
    return new BaseError(
      clientError.messages.BAD_REQUEST,
      statusCodes.errors.BAD_REQUEST,
    );
  }

  static createValidationError(errors) {
    return new BaseError(
      clientError.messages.VALIDATION_FAILED,
      statusCodes.errors.BAD_REQUEST,
      errors,
    );
  }

  static  createNotFountError() {
    return new BaseError(
      clientError.messages.NOT_FOUND,
      statusCodes.errors.NOT_FOUND,
    );
  }
}

module.exports = BaseError;
