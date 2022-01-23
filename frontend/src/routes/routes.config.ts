// import { MEETING_ROUTES } from "@app/modules/meetings/meetings";
import AUTH_ROUTES from '@app/modules/auth/routes/auth.routes';
import { HOME_ROUTES } from '@app/modules/home/home';
import { MEETING_ROUTES } from '@app/modules/meetings/meeting';
import { USER_ROUTES } from '@app/modules/users/users';

export const ROOT_ROUTE = '/';

export const ROUTE_LIST = [
  ...AUTH_ROUTES,
  ...HOME_ROUTES,
  ...MEETING_ROUTES,
  ...USER_ROUTES,
];
