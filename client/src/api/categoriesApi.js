import { createRequest } from '../utils/utils';

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001/api/categories'
  : '/api/categories';

const normalizeCategories = (categoriesList) => {
  const rootIds = categoriesList
    .filter((category) => !category.parentId)
    .map((category) => category._id);
  const names = {};
  const parentIds = {};

  categoriesList.forEach((category) => {
    names[category._id] = category.name;
    parentIds[category._id] = category.parentId;
  });

  return { rootIds, names, parentIds };
};

export const getAllCategories = async () => {
  const { data: categories } = await createRequest(
    API_URL,
    { requestOptions: { method: 'GET' } },
  );

  return normalizeCategories(categories);
};

export const addNewCategory = (categoryName, parentId) => (
  createRequest(
    API_URL,
    { requestOptions: { body: JSON.stringify({ name: categoryName, parentId }) } },
  )
);

export const removeCategoryById = (categoryId) => (
  createRequest(
    `${API_URL}/${categoryId}`,
    { requestOptions: { method: 'DELETE' } },
  )
);

export const updateCategory = (categoryId, categoryData) => (
  createRequest(
    `${API_URL}/${categoryId}`,
    {
      requestOptions: {
        method: 'PUT',
        body: JSON.stringify({ ...categoryData }),
      },
    },
  )
);
