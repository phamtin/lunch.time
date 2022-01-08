import React from 'react';

import { RouteDef } from '@app/utils/types/routes.type';

import { HomePaths } from '../constants/home.constant';

const HOME_SCREEN: RouteDef = {
  id: 'home',
  path: HomePaths.HOME,
  component: React.lazy(() => import('@app/modules/home/screens/Home/Home')),
  isPrivate: true,
};

const HOME_ROUTES = [HOME_SCREEN];

export default HOME_ROUTES;
