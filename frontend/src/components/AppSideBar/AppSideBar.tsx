import { memo, useEffect, useState } from 'react';

import { ArrowBack } from '@mui/icons-material';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Badge,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { navs } from '@app/utils/constants/constants';

import { useStyles } from './styles';

interface SidebarProps {
  isOpenDrawerSidebar: boolean;
  toggleDrawerSidebar: () => void;
}

function Sidebar({ isOpenDrawerSidebar, toggleDrawerSidebar }: SidebarProps) {
  const classes = useStyles();
  const { pathname } = useLocation();

  const [currentNav, setCurrentNav] = useState<number>(1);

  useEffect(() => {
    navs.findIndex(nav => {
      if (nav.url === pathname) setCurrentNav(nav.id);
      return null;
    });
  });

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
        <Badge
          badgeContent="v1.0.0"
          color="success"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ width: '88px' }}
        >
          <Box
            className={`${classes.icon} ${
              !isOpenDrawerSidebar && classes.iconSmall
            }`}
            component="img"
            src="/lunchtime-logo-small.png"
            alt="lunchtime-logo-small"
          />
        </Badge>
        <br />
        <List
          className={`${classes.list} ${!isOpenDrawerSidebar && classes.smallList}`}
        >
          {navs.map(nav => (
            <Box
              key={nav.id}
              className={`${currentNav === nav.id && classes.activeNav}`}
            >
              <ListItem button component={RouterLink} to={nav.url}>
                <ListItemIcon>{nav.icon}</ListItemIcon>
                <ListItemText>{nav.name}</ListItemText>
              </ListItem>
            </Box>
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
