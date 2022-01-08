import React, { memo, Suspense } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import Spinner from '@app/components/Spinner/Spinner';
import DefaultLayout from '@app/layouts/default/DefaultLayout';
import { AuthPaths } from '@app/modules/auth/auth';
import { getCurrentUser, getToken } from '@app/utils/common/storage';
import { RouteDef } from '@app/utils/types/routes.type';

import { ROUTE_LIST, ROOT_ROUTE } from './routes.config';

const NotFoundScreen = React.lazy(
  () => import('@app/modules/errors/screens/NotFoundScreen')
);

const routeWrapper = ({
  id,
  component: Component,
  layout,
  path,
  isAuthRoute,
  title,
  isPrivate,
  whichPermision,
}: RouteDef) => {
  const RouteLayout = layout ?? DefaultLayout;

  return (
    <Route
      exact
      key={id}
      path={path}
      render={props => {
        const isAuthenticated = !!getToken();

        if (isAuthRoute && isAuthenticated) {
          return <Redirect key="ROOT_ROUTE" to={ROOT_ROUTE} />;
        }

        if (!!isPrivate && !isAuthenticated) {
          return <Redirect key="AUTH_ROUTE" to={AuthPaths.SIGNIN} />;
        }

        if (whichPermision) {
          const currentUser = getCurrentUser();
          if (currentUser && !whichPermision.includes(currentUser.role)) {
            return <Redirect key="ACCES_DENIED_ROUTE" to="/404" />;
          }
        }
        function Content() {
          return (
            <RouteLayout>
              <div>
                <title>{title}</title>
                <meta name="description" content="Description application" />
              </div>

              <Component {...props} />
            </RouteLayout>
          );
        }

        return <Content />;
      }}
    />
  );
};

function Routes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {ROUTE_LIST.map(route => routeWrapper(route))}
        <Route path="*" exact component={NotFoundScreen} />
      </Switch>
    </Suspense>
  );
}

export default memo(Routes);
