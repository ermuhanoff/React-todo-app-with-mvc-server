import { createRequest } from '../utils/utils';

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001/api/categories'
  : '/api/categories';

const normalizeTasks = (tasksList) => {
  const ids = [];
  const names = {};
  const categoryIds = {};
  const isDoneStates = {};
  const values = {};

  tasksList.forEach((task) => {
    ids.push(task._id);
    names[task._id] = task.name;
    isDoneStates[task._id] = task.isDone;
    categoryIds[task._id] = task.categoryId;
    values[task._id] = { description: task.description };
  });

  return { ids, names, isDoneStates, categoryIds, values };
};

export const getAllTasks = async (categoryId) => {
  const { data: tasks } = await createRequest(
    `${API_URL}/${categoryId}/tasks`,
    { requestOptions: { method: 'GET' } },
  );

  return normalizeTasks(tasks);
};

export const toggleIsDone = async (categoryId, taskId, isDone) => (
  createRequest(
    `${API_URL}/${categoryId}/tasks/${taskId}`,
    {
      requestOptions: {
        method: 'PUT',
        body: JSON.stringify({ isDone }),
      },
    },
  )
);
export const addNewTask = async (categoryId, taskName) => (
  createRequest(
    `${API_URL}/${categoryId}/tasks`,
    { requestOptions: { body: JSON.stringify({ name: taskName, categoryId }) } },
  )
);

export const updateTask = async (categoryId, taskId, taskData) => (
  createRequest(
    `${API_URL}/${categoryId}/tasks/${taskId}`,
    {
      requestOptions: {
        method: 'PUT',
        body: JSON.stringify({ ...taskData }),
      },
    },
  )
);

export const updateTaskCategoryId = (categoryId, taskId) => (
  createRequest(
    `${API_URL}/${categoryId}/tasks/${taskId}`,
    {
      requestOptions: {
        method: 'PUT',
        body: JSON.stringify({ categoryId }),
      },
    },
  )
);
