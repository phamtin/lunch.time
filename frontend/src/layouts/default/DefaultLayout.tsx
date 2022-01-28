import { memo, ReactNode, useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import Appbar from '@app/components/AppBar/AppBar';
import AppSidebar from '@app/components/AppSideBar/AppSideBar';
import theme from '@app/styles/theme';
import {
  APP_BAR_HEIGHT,
  APP_SIDEBAR_WIDTH,
  APP_SIDEBAR_WIDTH_SMALL,
} from '@app/utils/constants/constants';

type DefaultLayoutProps = {
  children: ReactNode;
};

function DefaultLayout({ children }: DefaultLayoutProps) {
  const [isOpenDrawerSidebar, setIsOpenDrawerSidebar] = useState<boolean>(true);
  const [currentSubMenu, setCurrentSubMenu] = useState<string>('');

  useEffect(() => {
    if (location.pathname.startsWith('users')) {
      setCurrentSubMenu('setting');
      setIsOpenDrawerSidebar(false);
    }
  }, [currentSubMenu]);

  const onToggleDrawerSidebar = () => {
    setIsOpenDrawerSidebar(!isOpenDrawerSidebar);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {currentSubMenu}
      <AppSidebar
        toggleDrawerSidebar={onToggleDrawerSidebar}
        isOpenDrawerSidebar={isOpenDrawerSidebar}
      />
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
        }}
      >
        <Appbar isOpenDrawerSidebar={isOpenDrawerSidebar} />

        <Box
          sx={{
            height: 'maxContent',
            minHeight: 'calc(100% - 140px)',
            mt: APP_BAR_HEIGHT,
            ml: isOpenDrawerSidebar ? APP_SIDEBAR_WIDTH : APP_SIDEBAR_WIDTH_SMALL,
            p: theme.spacing(3.5),
            backgroundColor: 'rgb(242, 245, 249)',
            transition: '0.3s',
          }}
        >
          <Box>{children}</Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            ml: isOpenDrawerSidebar ? APP_SIDEBAR_WIDTH : APP_SIDEBAR_WIDTH_SMALL,
            p: '30px 28px',
            color: theme.palette.grey[500],
            transition: '0.3s',
          }}
        >
          <Typography>
            © 2022 - Lunchtime React Typescript Admin Dashboard
          </Typography>
          <Typography>
            Crafted with heart by&nbsp;
            <span style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
              Ragon, Kuro
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(DefaultLayout);
