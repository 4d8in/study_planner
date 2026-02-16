import api from './api';

export async function loginRequest(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function registerRequest(payload) {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function refreshRequest(refresh_token) {
  const { data } = await api.post('/auth/refresh', { refresh_token });
  return data;
}

export async function logoutRequest(refresh_token) {
  const { data } = await api.post('/auth/logout', { refresh_token });
  return data;
}

export async function fetchMe() {
  const { data } = await api.get('/me');
  return data;
}

export async function updateMe(payload) {
  const { data } = await api.put('/me', payload);
  return data;
}
