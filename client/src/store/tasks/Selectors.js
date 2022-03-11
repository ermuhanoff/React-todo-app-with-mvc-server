import { createSelector } from 'reselect';

export const getTasksIds = (state) => state.tasks.ids;

const getTasksCategoryIds = (state) => state.tasks.categoryIds;

const getTasksIsDoneStates = (state) => state.tasks.isDoneStates;

export const getTaskNameById = (state, id) => state.tasks.names[id] || null;

export const getTaskNames = (state) => state.tasks.names;

export const getTaskIsDoneById = (state, id) => state.tasks.isDoneStates[id];

export const getTaskCategoryIdById = (state, id) => state.tasks.categoriesIds[id] || null;

export const getTaskDescriptionById = (state, id) => state.tasks.values[id]
  ? state.tasks.values[id].description
  : null;

export const getIsFetchingState = (state) => state.tasks.isFetching;

export const getTasksIdsByCategoryId = createSelector(
  getTasksCategoryIds,
  (state, neededCategoryId) => neededCategoryId,
  (categoryIds, neededCategoryId) => Object.entries(categoryIds)
    .filter(([, categoryId]) => categoryId === neededCategoryId)
    .map(([taskId]) => taskId),
);

export const getFilteredTasks = createSelector(
  getTaskNames,
  getTasksIsDoneStates,
  (state, categoryId) => getTasksIdsByCategoryId(state, categoryId),
  (state, categoryId, isDoneFilter) => isDoneFilter,
  (state, categoryId, isDoneFilter, searchFilter) => searchFilter,
  (names, isDoneStates, tasksIds, isDoneFilter, searchFilter) => tasksIds.filter((taskId) => {
    const isDoneCondition = isDoneFilter ? isDoneStates[taskId] : true;
    const searchCondition = searchFilter
      ? names[taskId].toLowerCase().includes(searchFilter.toLowerCase())
      : true;

    return searchCondition && isDoneCondition;
  }),
);

export const getTasksIsDoneStatesByCategoryId = createSelector(
  getTasksIsDoneStates,
  (state, categoryId) => getTasksIdsByCategoryId(state, categoryId),
  (isDoneStates, taskIds) => taskIds.map((taskId) => isDoneStates[taskId]),
);
