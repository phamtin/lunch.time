import React from 'react';

import { AuthPaths } from '../constants/auth.path';

const SigninScreen = React.lazy(
  () => import('@app/modules/auth/screens/SigninScreen/SigninScreen')
);
const AuthLayout = React.lazy(() => import('@app/layouts/auth/AuthLayout'));

const LOGIN_SCREEN = {
  id: 'login',
  title: 'Welcome back, Admin',
  path: AuthPaths.SIGNIN,
  component: SigninScreen,
  layout: AuthLayout,
  isAuthRoute: true,
};

const FORGOT_PASSWORD_SCREEN = {
  id: 'forgot-password',
  title: 'Get reset email',
  path: AuthPaths.FORGOT_PASSWORD,
  component: SigninScreen,
  layout: AuthLayout,
  isAuthRoute: true,
};

const RESET_PASSWORD_SCREEN = {
  id: 'reset-password',
  title: 'Reset your password',
  path: AuthPaths.RESET_PASSWORD,
  component: SigninScreen,
  layout: AuthLayout,
  isAuthRoute: true,
};

const AUTH_ROUTES = [LOGIN_SCREEN, FORGOT_PASSWORD_SCREEN, RESET_PASSWORD_SCREEN];

export default AUTH_ROUTES;
