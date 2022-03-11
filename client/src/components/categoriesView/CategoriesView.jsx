import React from 'react';

import { Category } from '../category';

const mapCategoryIdsToElements = (categoriesIds) => categoriesIds.map((categoryId) => (
  <Category
    key={categoryId}
    categoryId={categoryId}
    map={mapCategoryIdsToElements}
  />
));

export const CategoriesView = ({ categoriesIds }) => (
  categoriesIds.length === 0 ? (
    <div>No categories!</div>
  ) : (
    mapCategoryIdsToElements(categoriesIds)
  )
);
