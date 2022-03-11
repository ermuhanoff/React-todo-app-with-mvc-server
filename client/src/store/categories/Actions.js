import { categoriesActionTypes as types } from './ActionTypes';
import { openErrorAlertThunk, openSuccessAlertThunk } from '../alerts/Actions';
import { clearTasksAction } from '../tasks/Actions';

import {
  getAllCategories,
  addNewCategory,
  removeCategoryById,
  updateCategory,
} from '../../api/categoriesApi';

export const getCategoriesThunk = () => async (dispatch) => {
  dispatch(toggleFetchingAction(true));

  await getAllCategories()
    .then((categories) => dispatch(getCategoriesAction(categories)))
    .finally(() => dispatch(toggleFetchingAction(false)))
    .catch((err) => dispatch(openErrorAlertThunk(err)));
};

export const addCategoryThunk = (categoryName) => async (dispatch) => {
  addNewCategory(categoryName, null)
    .then((response) => dispatch(addCategoryAction(response.data)))
    .catch((err) => dispatch(openErrorAlertThunk(err)));
};

export const addNestedCategoryThunk = (categoryName, parentId) => async (dispatch) => {
  addNewCategory(categoryName, parentId)
    .then((response) => dispatch(addNestedCategoryAction(response.data, parentId)))
    .catch((err) => dispatch(openErrorAlertThunk(err)));
};

export const removeCategoryThunk = (categoryId) => async (dispatch) => {
  removeCategoryById(categoryId)
    .then((response) => {
      dispatch(openSuccessAlertThunk(response.message));
      dispatch(removeCategoryAction(categoryId));
      dispatch(clearTasksAction());
    })
    .catch((err) => dispatch(openErrorAlertThunk(err)));
};

export const editCategoryThunk = (categoryId, categoryData) => async (dispatch) => {
  updateCategory(categoryId, categoryData)
    .then((response) => {
      dispatch(openSuccessAlertThunk(response.message));
      dispatch(editCategoryAction({ _id: categoryId, ...categoryData }));
    })
    .catch((err) => dispatch(openErrorAlertThunk(err)));
};

const getCategoriesAction = (categories) => ({
  type: types.GET_CATEGORIES,
  payload: categories,
});

const removeCategoryAction = (categoryId) => ({
  type: types.REMOVE_CATEGORY,
  payload: categoryId,
});

const addCategoryAction = (category) => ({
  type: types.ADD_CATEGORY,
  payload: category,
});

const addNestedCategoryAction = (category, parentId) => ({
  type: types.ADD_NESTED_CATEGORY,
  payload: { category, parentId },
});

const editCategoryAction = (category) => ({
  type: types.EDIT_CATEGORY,
  payload: category,
});

export const toggleFetchingAction = (isFetching) => ({
  type: types.TOGGLE_CATEGORIES_FETCHING,
  payload: isFetching,
});
