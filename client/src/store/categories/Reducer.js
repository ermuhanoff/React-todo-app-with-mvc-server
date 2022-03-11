import { getReducerMapping } from '../reducerMapping';
import { categoriesActionTypes as types } from './ActionTypes';

const initialState = {
  rootIds: [],
  names: {},
  parentIds: {},
  isFetching: false,
};

const reducerMapping = {
  [types.GET_CATEGORIES]: (state, categories) => ({
    ...state,
    ...categories,
  }),

  [types.REMOVE_CATEGORY]: (state, categoryId) => {
    const newState = {
      ...state,
      rootIds: state.rootIds.filter((id) => id !== categoryId),
      names: { ...state.names },
      parentIds: { ...state.parentIds },
    };

    delete newState.names[categoryId];
    delete newState.parentIds[categoryId];

    Object.entries(newState.parentIds).filter(
      ([, parentId]) => parentId === categoryId,
    ).forEach(([childId]) => {
      delete newState.names[childId];
      delete newState.parentIds[childId];
    });

    return newState;
  },

  [types.ADD_CATEGORY]: (state, category) => ({
    ...state,
    rootIds: [...state.rootIds, category._id],
    names: {
      ...state.names,
      [category._id]: category.name,
    },
    parentIds: {
      ...state.parentIds,
      [category._id]: null,
    },
  }),

  [types.ADD_NESTED_CATEGORY]: (state, payload) => ({
    ...state,
    names: {
      ...state.names,
      [payload.category._id]: payload.category.name,
    },
    parentIds: {
      ...state.parentIds,
      [payload.category._id]: payload.parentId,
    },
  }),

  [types.EDIT_CATEGORY]: (state, category) => ({
    ...state,
    names: {
      ...state.names,
      [category._id]: category.name,
    },
  }),

  [types.TOGGLE_CATEGORIES_FETCHING]: (state, isFetching) => ({
    ...state,
    isFetching,
  }),
};

export const categoriesReducer = getReducerMapping(reducerMapping, initialState);
