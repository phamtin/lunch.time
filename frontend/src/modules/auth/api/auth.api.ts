import { api } from '@app/api/api';

import { AuthEndpoints } from '../constants/auth.endpoint';
import { LoginInput } from '../types/auth.type';

export const signinApi = (data: LoginInput) => {
  const url = AuthEndpoints.SIGNIN;
  return api.post(url, data);
};

export const logoutApi = () => {
  const url = AuthEndpoints.LOGOUT;
  return api.post(url);
};
