const clientError = {
  messages: {
    INVALID_PASSWORD: 'Invalid password',
    INVALID_EMAIL: 'Invalid email address',
    UNAUTHORIZED: 'User not authorized',
    INVALID_URL: 'Invalid url address',
    BAD_REQUEST: 'Bad request',
    VALIDATION_FAILED: 'Validation failed!',
    NOT_FOUND: 'Requested data not found!'
  },
};

const serverError = {
  messages: { INTERNAL_ERROR: 'Internal server error' },
};

module.exports = {
  clientError,
  serverError,
};
