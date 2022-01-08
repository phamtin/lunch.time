import React from 'react';

const AuthLayout = React.lazy(() => import('@app/layouts/default/DefaultLayout'));

const NOT_FOUND_SCREEN = {
  title: 'Page Not Found',
  path: '/404',
  component: React.lazy(() => import('../screens/NotFoundScreen')),
  layout: AuthLayout,
};

const ERROR_PAGE_ROUTES = [NOT_FOUND_SCREEN];

export default ERROR_PAGE_ROUTES;
