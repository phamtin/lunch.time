/* eslint-disable @typescript-eslint/no-explicit-any */

import { memo, useState } from 'react';

import {
  Search,
  QuestionAnswer,
  NotificationsActive,
  KeyboardArrowDown,
  KeyboardArrowRight,
  LockOpen,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
} from '@mui/material';

import { useLogout } from '@app/modules/auth/hooks/auth.hook';
import theme from '@app/styles/theme';
import {
  APP_BAR_HEIGHT,
  APP_SIDEBAR_WIDTH,
  APP_SIDEBAR_WIDTH_SMALL,
} from '@app/utils/constants/constants';

interface AppbarProps {
  isOpenDrawerSidebar: boolean;
}

const Appbar = ({ isOpenDrawerSidebar }: AppbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchor, setAnchor] = useState<any>(null);
  const onChooseAva = (e: any) => {
    setIsOpen(!isOpen);
    setAnchor(e.currentTarget);
  };

  const { mutate } = useLogout();

  const linkAva =
    'https://lh3.googleusercontent.com/a-/AOh14Ghp43JKBN_eX6UkmVtyBu1rgxG48OC_VKrhaWz6VsE=s120';

  const onLogout = () => mutate();

  return (
    <AppBar
      sx={{
        width: `calc(100% - ${
          isOpenDrawerSidebar ? APP_SIDEBAR_WIDTH : APP_SIDEBAR_WIDTH_SMALL
        })`,
        height: APP_BAR_HEIGHT,
        backgroundColor: 'white',
        color: 'secondary.dark',
        transition: '0.4s',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          p: '0 16px',
        }}
      >
        <Box sx={{ display: 'flex', flex: '1 0' }}>
          <IconButton sx={{ borderRadius: '10px', mr: '12px' }}>
            <Search sx={{ color: theme.palette.primary.main }} />
          </IconButton>
          <Button
            sx={{
              display: 'flex',
              fontWeight: '700',
              px: '12px',
              backgroundColor: theme.palette.grey[200],
              color: theme.palette.text.primary,
              ':hover': {
                color: theme.palette.grey[100],
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            size="small"
          >
            Dashboard
            <KeyboardArrowDown />
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            sx={{
              borderRadius: '8px',
              mr: '12px',
              backgroundColor: '#E8ECF7',
            }}
          >
            <NotificationsActive sx={{ color: theme.palette.primary.main }} />
          </IconButton>
          <IconButton
            sx={{
              borderRadius: '8px',
              marginRight: '12px',
              backgroundColor: '#FFF5EB',
            }}
          >
            <QuestionAnswer sx={{ color: '#FFB85C' }} />
          </IconButton>
          <Box
            component="img"
            sx={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            src={linkAva}
            alt=""
            onClick={onChooseAva}
          />
          <Menu
            open={isOpen}
            anchorEl={anchor}
            sx={{
              '.MuiList-root': {
                py: 0,
              },
              '.MuiMenuItem-root': {
                px: theme.spacing(2.5),
                '&: hover': { borderRadius: '100px' },
              },
            }}
            onClose={() => setIsOpen(false)}
          >
            <Box
              sx={{
                p: '10px 0 15px 15px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: theme.palette.grey[200],
                width: '320px',
              }}
            >
              <Box
                component="img"
                sx={{
                  mr: '10px',
                  width: '34px',
                  height: '34px',
                  borderRadius: '9px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                src={linkAva}
                alt=""
              />
              <Box
                sx={{
                  flex: 1,
                  fontWeight: '700',
                  color: theme.palette.text.primary,
                }}
              >
                Randy Smith
                <Typography
                  sx={{ color: theme.palette.grey[600] }}
                  variant="subtitle2"
                >
                  Lead Developer
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                py: '10px',
                '.MuiMenuItem-root ': {
                  display: 'flex',
                  marginLeft: '10px',
                  py: '10px',
                },
                '.MuiTypography-root': {
                  flex: 1,
                  fontWeight: 600,
                },
              }}
            >
              <MenuItem>
                <Typography>My Account</Typography>
                <KeyboardArrowRight />
              </MenuItem>
              <MenuItem>
                <Typography>Project settings</Typography>
                <KeyboardArrowRight />
              </MenuItem>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderTop: `1px solid ${theme.palette.grey[200]}`,
                padding: '10px',
              }}
            >
              <Button
                size="large"
                fullWidth
                sx={{ mx: 'auto', color: theme.palette.primary.main }}
                onClick={onLogout}
              >
                <LockOpen />
                &nbsp;
                <Typography sx={{ fontWeight: 'bold' }}>Sign out</Typography>
              </Button>
            </Box>
          </Menu>
        </Box>
      </Box>
    </AppBar>
  );
};

export default memo(Appbar);
