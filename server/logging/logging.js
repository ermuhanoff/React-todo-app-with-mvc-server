const logLevels = {
  TIME: 'TIME',
  INFO: 'INFO',
  ERROR: 'ERROR',
  REQUEST: 'REQUEST',
  RESPONSE: 'RESPONSE',
};

const colors = {
  RESET: '\x1b[0m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  CYAN: '\x1b[36m',
};

const levelColors = {
  [logLevels.TIME]: colors.GREEN,
  [logLevels.INFO]: colors.BLUE,
  [logLevels.ERROR]: colors.RED,
  [logLevels.REQUEST]: colors.CYAN,
  [logLevels.RESPONSE]: colors.YELLOW,
};

const logMessage = (level, message) => {
  console.log(
    `${levelColors[logLevels.TIME]}%s${colors.RESET} ${levelColors[level]}%s${
      colors.RESET
    }`,
    `[${(new Date()).toLocaleString()}]`,
    `[${level}]`,
    message
  );
};

const logInfo = (message) => {
  logMessage(logLevels.INFO, message);
}

const logError = (message) => {
  logMessage(logLevels.ERROR, message);
}

const logRequest = (message) => {
  logMessage(logLevels.REQUEST, message);
}

const logResponse = (statusCode, message) => {
  const statusCodeColor = statusCode >= 200 && statusCode < 300 ? colors.GREEN : colors.RED;

  console.log(
    `${levelColors[logLevels.TIME]}%s${colors.RESET} ${levelColors[logLevels.RESPONSE]}%s${
      colors.RESET
    } ${statusCodeColor}%s${colors.RESET}`,
    `[${(new Date()).toLocaleString()}]`,
    `[${logLevels.RESPONSE}]`,
    `[${statusCode}]`,
    message
  );
}

module.exports = {
  logLevels,
  logMessage,
  logInfo,
  logError,
  logRequest,
  logResponse,
};
