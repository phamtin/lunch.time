import { memo } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Drawer, Box, Divider, Button } from '@mui/material';

import {
  APP_SIDEBAR_WIDTH,
  APP_SIDEBAR_WIDTH_SMALL,
} from '@app/utils/constants/constants';

interface SidebarProps {
  isOpenDrawerSidebar: boolean;
  toggleDrawerSidebar: () => void;
}

function Sidebar({ isOpenDrawerSidebar, toggleDrawerSidebar }: SidebarProps) {
  return (
    <Drawer variant="permanent" open={isOpenDrawerSidebar}>
      <Box
        sx={{
          width: isOpenDrawerSidebar ? APP_SIDEBAR_WIDTH : APP_SIDEBAR_WIDTH_SMALL,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'rgb(17, 25, 42)',
          transition: '0.4s',
        }}
      >
        <Box sx={{ color: '#fff' }}>L T</Box>
        <Divider />
        <Button
          sx={{ py: '8px', borderRadius: 1000, m: 'auto 0 20px 0' }}
          variant="outlined"
          onClick={toggleDrawerSidebar}
        >
          <ArrowBackIcon />
        </Button>
      </Box>
    </Drawer>
  );
}

export default memo(Sidebar);
