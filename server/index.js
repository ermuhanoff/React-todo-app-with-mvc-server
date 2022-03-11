const path = require('path');
const express = require('express');
require('express-async-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const apiRouter = require('./routers/apiRouter.js');
const errorHandling = require('./middlewares/errorHandling.js');
const responseWrapper = require('./middlewares/responseWrapper.js');
const loggingMiddleware = require('./middlewares/loggingMiddleware.js');
const { logInfo, logError } = require('./logging/logging.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(loggingMiddleware.requestLogging);
app.use(loggingMiddleware.responselogging);
app.use(responseWrapper);
app.use('/api', apiRouter);
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
);
app.use(loggingMiddleware.errorLogging);
app.use(errorHandling);

const main = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => logInfo(`MongoDB was connected`))
    .catch((err) => logError(err.message));

  app.listen(PORT, () => logInfo(`Server was running on ${PORT} port`));
};

main();
