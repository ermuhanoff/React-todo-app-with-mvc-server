import {
  createRequest,
  clearAuthorizationData,
  setAuthorizationData,
} from '../utils/utils';

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : '/api';

export const login = async (email, password) => {
  const requestOptions = { body: JSON.stringify({ email, password }) };

  const { data } = await createRequest(`${API_URL}/login`, {
    requestOptions,
    isProtected: false,
  });

  setAuthorizationData(data.token, `${data.firstname} ${data.secondname[0].toUpperCase()}.`);
};

export const logout = async () => {
  await createRequest(`${API_URL}/logout`);

  clearAuthorizationData();
};
