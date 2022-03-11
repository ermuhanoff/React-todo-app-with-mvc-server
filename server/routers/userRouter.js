const express = require('express');

const userController = require('../controllers/userController.js');
const authorize = require('../middlewares/authorize.js');

const userRouter = express.Router();

userRouter.post('/login', userController.login);
userRouter.post('/logout', authorize, userController.logout);

module.exports = userRouter;
