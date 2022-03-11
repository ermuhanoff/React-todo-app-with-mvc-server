const BaseError = require('../errors/BaseError.js');
const { Document } = require('mongoose');

const errorHandling = (err, req, res, next) => {
  if (err instanceof BaseError) {
    res.sendError(err);
  } else if (err instanceof Document.ValidationError) {
    const errors = Object.entries(err.errors).reduce((errorsObj, [propertyName, error]) => {
      errorsObj[propertyName] = error.message;

      return errorsObj;
    }, {});

    res.sendError(BaseError.createValidationError(errors));
  } else {
    res.sendError(BaseError.createInternalServerError());
  }
};

module.exports = errorHandling;
