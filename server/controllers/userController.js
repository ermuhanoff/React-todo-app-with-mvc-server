const userService = require('../services/userService.js');

class UserController {
  async login(req, res) {
    const { email, password } = req.body;

    const userObject = await userService.login(email, password);

    res.sendSuccess({
      token: `Bearer ${userObject.token}`,
      firstname: userObject.firstname,
      secondname: userObject.secondname,
    });
  }

  logout(req, res) {
    res.sendSuccess();
  }
}

module.exports = new UserController();
