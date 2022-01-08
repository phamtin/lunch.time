import { memo, ReactNode, useEffect, useState } from 'react';

import { Box } from '@mui/material';

import Appbar from '@app/components/AppBar/AppBar';
import AppSidebar from '@app/components/AppSideBar/AppSideBar';
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

  // const changeOpenSubMenu = (value: string) => {
  //   if (currentSubMenu === value) {
  //     setCurrentSubMenu('');
  //   } else {
  //     setCurrentSubMenu(value);
  //   }
  // };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {currentSubMenu}
      <AppSidebar
        toggleDrawerSidebar={onToggleDrawerSidebar}
        isOpenDrawerSidebar={isOpenDrawerSidebar}
        // openingSubMenu={currentSubMenu}
        // setOpenSubMenu={changeOpenSubMenu}
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
            height: '100%',
            mt: APP_BAR_HEIGHT,
            ml: isOpenDrawerSidebar ? APP_SIDEBAR_WIDTH : APP_SIDEBAR_WIDTH_SMALL,
            backgroundColor: 'rgb(242, 245, 249)',
            transition: '0.4s',
          }}
        >
          <Box>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(DefaultLayout);
