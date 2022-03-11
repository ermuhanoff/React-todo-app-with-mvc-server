const BaseResponse = require('../responses/BaseResponse.js');
const BaseError = require('../errors/BaseError.js');

const responseWrapper = (req, res, next) => {
  res.sendResponse = (baseResponse) => {
    if (!(baseResponse instanceof BaseResponse)) {
      throw BaseError.createInternalServerError();
    }

    res.responseMessage = baseResponse.message;
    res.status(baseResponse.status).send(baseResponse.toJson());
  };

  res.sendSuccess = (body, message) => {
    res.sendResponse(BaseResponse.createSuccess(body, message));
  };

  res.sendError = (err) => {
    res.sendResponse(BaseResponse.createError(err));
  }

  next();
};

module.exports = responseWrapper;
