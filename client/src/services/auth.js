import api from './api';

export async function loginRequest(username, password) {
  const { data } = await api.post('/auth/login', { username, password });
  return data;
}

export async function logoutRequest() {
  const { data } = await api.post('/auth/logout');
  return data;
}
