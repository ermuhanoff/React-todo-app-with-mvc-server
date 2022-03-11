import { createSelector } from 'reselect';

export const getCategoriesRootIds = (state) => state.categories.rootIds;

export const getCategoryNameById = (state, id) => state.categories.names[id];

const getCategoriesParentIds = (state) => state.categories.parentIds;

export const getCategoryChildrenById = createSelector(
  getCategoriesParentIds,
  (state, parentId) => parentId,
  (parentIds, parentId) => {
    const children = Object.entries(parentIds)
      .filter((keyValue) => keyValue[1] === parentId)
      .map((keyValue) => keyValue[0]);

    return children.length > 0 ? children : null;
  },
);

export const getIsFetchingState = (state) => state.categories.isFetching;
