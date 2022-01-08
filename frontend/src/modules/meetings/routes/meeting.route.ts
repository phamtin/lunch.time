import React from 'react';

import { MeetingsPaths } from '../meeting';

const SigninScreen = React.lazy(
  () => import('@app/modules/auth/screens/SigninScreen/SigninScreen')
);
const AuthLayout = React.lazy(() => import('@app/layouts/default/DefaultLayout'));

const MEETING_SCREEN = {
  id: 'login',
  title: 'Welcome back, Admin',
  path: MeetingsPaths.MEETINGS,
  component: SigninScreen,
  layout: AuthLayout,
  isAuthRoute: true,
};

const MEETING_ROUTES = [MEETING_SCREEN];

export default MEETING_ROUTES;
