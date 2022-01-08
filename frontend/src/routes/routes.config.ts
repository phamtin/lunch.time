// import { MEETING_ROUTES } from "@app/modules/meetings/meetings";
import AUTH_ROUTES from '@app/modules/auth/routes/auth.routes';
import { HOME_ROUTES } from '@app/modules/home/home';

export const ROOT_ROUTE = '/';

export const ROUTE_LIST = [...AUTH_ROUTES, ...HOME_ROUTES];
