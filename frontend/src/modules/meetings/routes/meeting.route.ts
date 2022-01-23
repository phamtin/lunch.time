import React from 'react';

import { MeetingsPaths } from '../constants/constants';

const MeetingsScreen = React.lazy(
  () => import('@app/modules/meetings/screens/MeetingsScreen/MeetingsScreen')
);
const Layout = React.lazy(() => import('@app/layouts/default/DefaultLayout'));

const MEETINGS_SCREEN = {
  id: 'meetings',
  title: 'Meetings list',
  path: MeetingsPaths.MEETINGS,
  component: MeetingsScreen,
  layout: Layout,
  isAuthRoute: false,
};

const MEETING_ROUTES = [MEETINGS_SCREEN];

export default MEETING_ROUTES;
