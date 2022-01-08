import { PROFILE } from '../constants/constants';

export function setToken(value: string) {
  if (typeof window === 'undefined') return '';
  localStorage.setItem(PROFILE.TOKEN, JSON.stringify(value));
  return true;
}

export function getToken() {
  if (typeof window === 'undefined') return '';
  const token = localStorage.getItem(PROFILE.TOKEN) ?? '';
  if (!token) return '';
  return JSON.parse(token);
}

export function removeToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROFILE.TOKEN);
}

export function setCurrentUser(value: Record<string, unknown>) {
  if (typeof window === 'undefined') return '';
  localStorage.setItem(PROFILE.CURRENT_USER, JSON.stringify(value));
  return true;
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return '';
  const user = localStorage.getItem(PROFILE.CURRENT_USER) ?? '';
  if (!user) return '';
  return JSON.parse(user);
}

export function removeCurrentUser() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROFILE.CURRENT_USER);
}

export function removeLocalStorage() {
  if (typeof window === 'undefined') return;
  localStorage.clear();
}
