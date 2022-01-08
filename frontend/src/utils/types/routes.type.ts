import { ComponentType } from 'react';

import { RouteComponentProps } from 'react-router-dom';

export type RouteDef = {
  id: string;
  path: string;
  component: ComponentType<RouteComponentProps>;
  layout?: any;
  isPrivate?: boolean;
  isAuthRoute?: boolean;
  title?: string;
  hasOpen?: boolean;
  whichPermision?: string[] | null;
};
