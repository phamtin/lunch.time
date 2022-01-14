import { memo } from 'react';

import {
  ArrowBack,
  Feed,
  HealthAndSafety,
  AssignmentInd,
  AccountTree,
} from '@mui/icons-material';
import { Drawer, Box, Button, List, ListItem, ListItemText } from '@mui/material';

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
        className={`${classes.container} ${
          !isOpenDrawerSidebar && classes.smallWidthContainer
        }`}
      >
        <List
          className={`${classes.list} ${!isOpenDrawerSidebar && classes.smallList}`}
        >
          <ListItem button>
            <Feed />
            <ListItemText>Blueprints</ListItemText>
          </ListItem>
          <ListItem button>
            <HealthAndSafety />
            <ListItemText>Data Display</ListItemText>
          </ListItem>
          <ListItem button>
            <AssignmentInd />
            <ListItemText>Users</ListItemText>
          </ListItem>
          <ListItem button>
            <AccountTree />
            <ListItemText>Projects</ListItemText>
          </ListItem>
        </List>
        <Box className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={toggleDrawerSidebar}
            fullWidth
          >
            <ArrowBack />
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default memo(Sidebar);
