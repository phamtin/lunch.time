import { memo } from 'react';

import {
  ArrowBack,
  Feed,
  HealthAndSafety,
  AssignmentInd,
  AccountTree,
} from '@mui/icons-material';
import { Drawer, Box, Button, List, ListItem, ListItemText } from '@mui/material';

import theme from '@app/styles/theme';
import {
  APP_SIDEBAR_WIDTH,
  APP_SIDEBAR_WIDTH_SMALL,
} from '@app/utils/constants/constants';

import { useStyles } from './styles';

interface SidebarProps {
  isOpenDrawerSidebar: boolean;
  toggleDrawerSidebar: () => void;
}

function Sidebar({ isOpenDrawerSidebar, toggleDrawerSidebar }: SidebarProps) {
  const classes = useStyles();

  return (
    <Drawer variant="permanent" open={isOpenDrawerSidebar}>
      <Box
        className={classes.container}
        sx={{
          width: isOpenDrawerSidebar ? APP_SIDEBAR_WIDTH : APP_SIDEBAR_WIDTH_SMALL,
        }}
      >
        <List
          className={classes.list}
          sx={{
            '.MuiSvgIcon-root': { mr: '10px' },
            '.MuiListItem-root': {
              ':hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: theme.palette.primary.contrastText,
              },
            },
          }}
        >
          <ListItemText className={classes.listText}>GENERAL</ListItemText>
          <ListItem button>
            <Feed />
            Blueprints
          </ListItem>
          <ListItem button>
            <HealthAndSafety />
            Data Display
          </ListItem>
          <ListItemText className={classes.listText}>MANAGEMENT</ListItemText>
          <ListItem button>
            <AssignmentInd />
            Users
          </ListItem>
          <ListItem button>
            <AccountTree />
            Projects
          </ListItem>
        </List>
        <Button
          sx={{
            py: '8px',
            borderRadius: 1000,
            m: 'auto 0 20px 0',
          }}
          variant="outlined"
          onClick={toggleDrawerSidebar}
        >
          <ArrowBack />
        </Button>
      </Box>
    </Drawer>
  );
}

export default memo(Sidebar);
