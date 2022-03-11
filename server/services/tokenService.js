const jwt = require('jsonwebtoken');

class TokenService {
  constructor() {
    this.secretKey = process.env.JWT_SECRET_KEY;
    this.expiresIn = '30m';
  }

  verifyFromHeader(authorizationHeader) {
    const [_, token] = authorizationHeader.split(' ');
    let decodedToken;
  
    try {
      decodedToken = jwt.verify(token, this.secretKey);
    } catch (err) {
      return null;
    }
  
    return decodedToken;
  }
  
  generate(payload) {
    return jwt.sign(
      payload,
      this.secretKey,
      { expiresIn: this.expiresIn }
    );
  }
}

module.exports = new TokenService();
