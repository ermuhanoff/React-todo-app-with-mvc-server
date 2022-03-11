const BaseError = require('../errors/BaseError.js');
const userService = require('../services/userService.js');

const authorize = (req, res, next) => {
  if (!req.headers.authorization) {
    throw BaseError.createUnauthorizedError();
  }

  req.user = userService.authorize(req.headers.authorization);

  next();
};

module.exports = authorize;
