/* eslint-disable filenames/match-regex */
import {
  Feed,
  HealthAndSafety,
  AssignmentInd,
  AccountTree,
} from '@mui/icons-material';

export const EMAIL_REGEX = /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,12})+$/;

export const APP_BAR_HEIGHT = '55px';
export const APP_SIDEBAR_WIDTH = '235px';
export const APP_SIDEBAR_WIDTH_SMALL = '60px';

export enum PROFILE {
  TOKEN = 'token',
  CURRENT_USER = 'current_user',
}

export enum ROLE {
  USER = 'user',
  ADMIN = 'admin',
}

export enum STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const navs = [
  {
    id: 1,
    name: 'Blueprints',
    url: '/',
    icon: <Feed />,
  },
  {
    id: 2,
    url: '/',
    name: 'Data display',
    icon: <HealthAndSafety />,
  },
  {
    id: 3,
    url: '/users',
    name: 'Users',
    icon: <AssignmentInd />,
  },
  {
    id: 4,
    url: '/meetings',
    name: 'meetings',
    icon: <AccountTree />,
  },
];
