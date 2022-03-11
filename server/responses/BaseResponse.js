const { statusCodes, messages } = require('./constants.js');

class BaseResponse {
  constructor(status, message, data = {}, errors = []) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.errors = errors;
  }

  toJson() {
    return JSON.stringify({
      status: this.status,
      message: this.message,
      data: this.data,
      errors: this.errors,
    });
  }

  static createSuccess(data, message = messages.REQUEST_COMPLETED) {
    return new BaseResponse(
      statusCodes.success.OK,
      message,
      data
    );
  }

  static createError(error) {
    return new BaseResponse(
      error.status,
      error.message,
      null,
      error.errors,
    );
  }
}

module.exports = BaseResponse;