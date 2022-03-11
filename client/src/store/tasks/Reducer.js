import { getReducerMapping } from '../reducerMapping';
import { tasksActionTypes as types } from './ActionTypes';

const initialState = {
  ids: [],
  names: {},
  categoryIds: {},
  isDoneStates: {},
  values: {},
  isFetching: false,
};

const reducerMapping = {
  [types.GET_TASKS]: (state, tasks) => ({
    ...state,
    ...tasks,
  }),

  [types.ADD_TASK]: (state, task) => ({
    ...state,
    names: {
      ...state.names,
      [task._id]: task.name,
    },
    categoryIds: {
      ...state.categoryIds,
      [task._id]: task.categoryId,
    },
    isDoneStates: {
      ...state.isDoneStates,
      [task._id]: task.isDone,
    },
    values: {
      ...state.values,
      [task._id]: { description: task.description },
    },
  }),

  [types.EDIT_TASK]: (state, task) => ({
    ...state,
    names: {
      ...state.names,
      [task._id]: task.name,
    },
    isDoneStates: {
      ...state.isDoneStates,
      [task._id]: task.isDone,
    },
    values: {
      ...state.values,
      [task._id]: { description: task.description },
    },
  }),

  [types.EDIT_TASK_CATEGORY]: (state, payload) => ({
    ...state,
    categoryIds: {
      ...state.categoryIds,
      [payload.taskId]: payload.categoryId,
    },
  }),

  [types.TOGGLE_IS_DONE]: (state, payload) => ({
    ...state,
    isDoneStates: {
      ...state.isDoneStates,
      [payload.taskId]: payload.isDone,
    },
  }),

  [types.CLEAR_TASKS]: (state) => ({
    ...state,
    ids: [],
    names: {},
    categoryIds: {},
    isDoneStates: {},
    values: {},
  }),

  [types.TOGGLE_TASKS_FETCHING]: (state, isFetching) => ({
    ...state,
    isFetching,
  }),
};

export const tasksReducer = getReducerMapping(reducerMapping, initialState);
