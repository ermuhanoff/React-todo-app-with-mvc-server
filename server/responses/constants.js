const statusCodes = {
  success: {
    OK: 200,
    CREATED: 201,
  },
  errors: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
  },
};

const messages = {
  REQUEST_COMPLETED: 'Request completed',
  TASK_CREATED: 'Task successfully created!',
  TASK_REMOVED: 'Task successfully removed!',
  TASK_UPDATED: 'Task successfully updated!',
  CATEGORY_CREATED: 'Caterogy successfully created!',
  CATEGORY_REMOVED: 'Caterogy successfully removed!',
  CATEGORY_UPDATED: 'Caterogy successfully updated!',
};

module.exports = {
  statusCodes,
  messages,
};
