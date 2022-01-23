import React from 'react';

import { UsersPaths } from '../constants/constants';

const UsersScreen = React.lazy(
  () => import('@app/modules/users/screens/UsersScreen/UsersScreen')
);
const Layout = React.lazy(() => import('@app/layouts/default/DefaultLayout'));

const USERS_SCREEN = {
  id: 'users',
  title: 'Users list',
  path: UsersPaths.USERS,
  component: UsersScreen,
  layout: Layout,
  isAuthRoute: false,
};

const USER_ROUTES = [USERS_SCREEN];

export default USER_ROUTES;
