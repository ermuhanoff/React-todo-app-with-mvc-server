import { tasksActionTypes as types } from './ActionTypes';
import { openErrorAlertThunk, openSuccessAlertThunk } from '../alerts/Actions';

import {
  getAllTasks,
  addNewTask,
  toggleIsDone,
  updateTask,
  updateTaskCategoryId,
} from '../../api/tasksApi';

export const getTasksThunk = (categoryId) => async (dispatch) => {
  dispatch(toggleFetchingAction(true));

  getAllTasks(categoryId)
    .then((tasks) => dispatch(getTasksAction(tasks)))
    .finally(() => dispatch(toggleFetchingAction(false)))
    .catch((err) => dispatch(openErrorAlertThunk(err)));
};

export const addTaskThunk = (taskName, categoryId) => async (dispatch) => {
  addNewTask(categoryId, taskName)
    .then((response) => dispatch(addTaskAction(response.data)))
    .catch((err) => dispatch(openErrorAlertThunk(err)));
};

export const editTaskThunk = (categoryId, taskId, taskData) => async (dispatch) => {
  updateTask(categoryId, taskId, taskData)
    .then((response) => {
      dispatch(openSuccessAlertThunk(response.message));
      dispatch(editTaskAction({ _id: taskId, ...taskData }));
    })
    .catch((err) => dispatch(openErrorAlertThunk(err)));
};

export const taskChangeCategoryThunk = (categoryId, taskId) => async (dispatch) => {
  updateTaskCategoryId(categoryId, taskId)
    .then((response) => {
      dispatch(openSuccessAlertThunk(response.message));
      dispatch(changeTaskCategoryAction(taskId, categoryId));
    })
    .catch((err) => dispatch(openErrorAlertThunk(err)));
};

export const toggleIsDoneThunk = (categoryId, taskId, isDone) => async (dispatch) => {
  await toggleIsDone(categoryId, taskId, isDone)
    .then(() => dispatch(toggleIsDoneAction(taskId, isDone)))
    .catch((err) => dispatch(openErrorAlertThunk(err)));
};

export const clearTasksAction = () => ({ type: types.CLEAR_TASKS });

const getTasksAction = (tasks) => ({
  type: types.GET_TASKS,
  payload: tasks,
});

const addTaskAction = (task) => ({
  type: types.ADD_TASK,
  payload: task,
});

const editTaskAction = (task) => ({
  type: types.EDIT_TASK,
  payload: task,
});

const changeTaskCategoryAction = (taskId, categoryId) => ({
  type: types.EDIT_TASK_CATEGORY,
  payload: { taskId, categoryId },
});

const toggleIsDoneAction = (taskId, isDone) => ({
  type: types.TOGGLE_IS_DONE,
  payload: { taskId, isDone },
});

export const toggleFetchingAction = (isFetching) => ({
  type: types.TOGGLE_TASKS_FETCHING,
  payload: isFetching,
});
