export const getRandomInteger = (min, max) => {
  const intMin = Math.ceil(min);
  const intMax = Math.floor(max);

  return Math.floor(Math.random() * (intMax - intMin + 1)) + intMin;
};

export const findCategoryById = (categoriesList, categoryId) => {
  const innerFind = (categories) => categories.find((category) => {
    if (category._id === categoryId) return true;
    if (category.children) {
      const nestedValue = innerFind(category.children);

      if (nestedValue) return nestedValue;
    }

    return false;
  });

  return innerFind(categoriesList);
};

export const calculateDonePercent = (isDoneValues) => {
  const allValuesCount = isDoneValues.length;
  const doneValuesCount = isDoneValues.reduce(
    (count, isDone) => (isDone ? count + 1 : count),
    0,
  );

  return +((100 * doneValuesCount) / allValuesCount).toFixed(2) || 0;
};

export const createRequest = async (url, options = {}) => {
  let headers = { 'Content-Type': 'application/json' };
  const { isProtected = true, requestOptions = {} } = options;

  if (isProtected) {
    headers.authorization = window.sessionStorage.getItem('token');
  }
  if (requestOptions.headers) {
    headers = { ...headers, ...requestOptions.headers };
  }

  const rawResponse = await window.fetch(url, {
    method: 'POST',
    ...requestOptions,
    headers,
  });

  const rawJson = await rawResponse.json().catch(() => {
    throw new Error('Request error');
  });

  if (!rawResponse.ok) {
    const err = new Error(rawJson.message);
    err.errors = rawJson.errors;

    if (rawJson.status === 401) {
      clearAuthorizationData();
    }

    throw err;
  }

  return rawJson;
};

export const clearAuthorizationData = () => {
  window.sessionStorage.removeItem('user');
  window.sessionStorage.removeItem('token');
};

export const setAuthorizationData = (token, user) => {
  window.sessionStorage.setItem('user', user);
  window.sessionStorage.setItem('token', token);
};
