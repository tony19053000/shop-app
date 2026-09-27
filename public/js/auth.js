import { apiRequest, getAuthToken, removeAuthToken, setAuthToken } from './api.js';

let currentUser = null;
const listeners = [];

export function subscribeAuth(fn) {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

function notifyListeners() {
  for (const fn of listeners) {
    fn(currentUser);
  }
}

export async function checkSession() {
  const token = getAuthToken();
  if (!token) {
    currentUser = null;
    notifyListeners();
    return null;
  }

  try {
    const user = await apiRequest('/api/me');
    currentUser = user;
    notifyListeners();
    return user;
  } catch (err) {
    removeAuthToken();
    currentUser = null;
    notifyListeners();
    return null;
  }
}

export function getUser() {
  return currentUser;
}

export async function login(email, password) {
  const res = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  setAuthToken(res.token);
  currentUser = res.user;
  notifyListeners();
  return res.user;
}

export async function signup(name, email, password) {
  const res = await apiRequest('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  });

  setAuthToken(res.token);
  currentUser = res.user;
  notifyListeners();
  return res.user;
}

export async function logout() {
  try {
    await apiRequest('/api/auth/logout', { method: 'POST' });
  } catch {
    // Continue local cleanup regardless of network status
  }
  removeAuthToken();
  currentUser = null;
  notifyListeners();
}

export default {
  checkSession,
  getUser,
  login,
  signup,
  logout,
  subscribeAuth
};
