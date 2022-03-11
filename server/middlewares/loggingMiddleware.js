const { logError, logRequest, logResponse } = require('../logging/logging.js');

const errorLogging = (err, req, res, next) => {
  logError(
    `${err.message} [at ${req.method} ${req.url}] [from ${req.socket.remoteAddress}]`
  );

  next(err);
};

const requestLogging = (req, res, next) => {
  logRequest(`${req.method} ${req.url} [from ${req.socket.remoteAddress}]`);

  next();
};

const responselogging = (req, res, next) => {
  const nativeSend = res.send;
  
  res.send = (data) => {
    logResponse(
      res.statusCode,
      `${res.responseMessage} [for ${req.method} ${req.url}] [to ${req.socket.remoteAddress}]`
    );

    nativeSend.call(res, data);
  }

  next();
};

module.exports = {
  requestLogging,
  responselogging,
  errorLogging,
};
