import { memo } from 'react';

import { ArrowBack } from '@mui/icons-material';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { navs } from '@app/utils/constants/constants';

import { useStyles } from './styles';

interface SidebarProps {
  isOpenDrawerSidebar: boolean;
  toggleDrawerSidebar: () => void;
}

function Sidebar({ isOpenDrawerSidebar, toggleDrawerSidebar }: SidebarProps) {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      open={isOpenDrawerSidebar}
    >
      <Box
        className={`${classes.container} ${
          !isOpenDrawerSidebar && classes.smallWidthContainer
        }`}
      >
        <List
          className={`${classes.list} ${!isOpenDrawerSidebar && classes.smallList}`}
        >
          {navs.map(nav => (
            <ListItem button key={nav.id} component={RouterLink} to={nav.url}>
              <ListItemIcon>{nav.icon}</ListItemIcon>
              {isOpenDrawerSidebar && <ListItemText>{nav.name}</ListItemText>}
            </ListItem>
          ))}
        </List>
        <IconButton className={classes.button} onClick={toggleDrawerSidebar}>
          <ArrowBack />
        </IconButton>
      </Box>
    </Drawer>
  );
}

export default memo(Sidebar);
