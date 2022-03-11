const express = require('express');

const categoryRouter = require('./categoryRouter.js');
const userRouter = require('./userRouter.js');

const apiRouter = express.Router();

apiRouter.use(categoryRouter);
apiRouter.use(userRouter);

module.exports = apiRouter;
