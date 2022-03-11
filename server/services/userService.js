const bcrypt = require('bcrypt');

const userModel = require('../models/userModel.js');
const BaseError = require('../errors/BaseError.js');
const tokenService = require('../services/tokenService.js');
const { clientError } = require('../errors/constants.js');
const { statusCodes } = require('../responses/constants.js');

class UserService {
  async login(email, password) {
    const currentUser = await userModel.findOne({ email });
  
    if (!currentUser) {
      throw new BaseError(
        clientError.messages.INVALID_EMAIL,
        statusCodes.errors.BAD_REQUEST
      );
    }
  
    const isPasswordCompared = bcrypt.compareSync(
      password,
      currentUser.passwordHash
    );
  
    if (!isPasswordCompared) {
      throw new BaseError(
        clientError.messages.INVALID_PASSWORD,
        statusCodes.errors.BAD_REQUEST
      );
    }
  
    const token = tokenService.generate({
      firstname: currentUser.firstname,
      secondname: currentUser.secondname,
    });
  
    return {
      firstname: currentUser.firstname,
      secondname: currentUser.secondname,
      token,
    };
  };
  
  logout() {}
  
  authorize(authorizationHeader) {
    const decodedToken = tokenService.verifyFromHeader(authorizationHeader);
  
    if (!decodedToken) {
      throw BaseError.createUnauthorizedError();
    }
  
    const currentUser = userModel.findOne({email: decodedToken.email});
  
    if (!currentUser) {
      throw BaseError.createUnauthorizedError();
    }
  
    return currentUser;
  }
}

module.exports = new UserService();
