import { makeStyles } from '@mui/styles';

import theme from '@app/styles/theme';
import {
  APP_SIDEBAR_WIDTH,
  APP_SIDEBAR_WIDTH_SMALL,
} from '@app/utils/constants/constants';

export const useStyles = makeStyles({
  icon: {
    width: '50px',
    height: '55px',
    marginLeft: '18px',
    marginTop: '16px',
    cursor: 'pointer',
  },
  iconSmall: {
    width: '40px',
    height: '46px',
    marginTop: '25px',
    marginLeft: '2px',
  },
  drawer: {
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: APP_SIDEBAR_WIDTH,
    height: '100vh',
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    backgroundColor: 'rgb(17, 25, 42)',
    overflowX: 'hidden',
    transition: '0.3s',
  },
  list: {
    flex: 1,
    paddingTop: '14px',
    color: theme.palette.grey[400],
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
    '& .MuiListItem-root': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '12px',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        color: '#fff',
        '& .MuiSvgIcon-root': {
          color: '#fff',
        },
      },
    },
    '& .MuiSvgIcon-root': {
      fontSize: '19px',
      color: theme.palette.grey[400],
    },
    '& span': {
      fontSize: '13.5px',
      fontWeight: 700,
    },
  },
  smallList: {
    marginRight: '-2px!important',
    '& .MuiSvgIcon-root': {
      transition: '0.3s',
      fontSize: '25px',
      justifyContent: 'center',
      marginLeft: '16px',
    },
    '& .MuiListItem-root': {
      marginBottom: '14px!important',
    },
  },
  smallWidthContainer: {
    width: APP_SIDEBAR_WIDTH_SMALL,
  },
  button: {
    color: theme.palette.primary.light,
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: '8px',
    padding: '8px 0',
    margin: 'auto 0 20px 0',
  },
  activeNav: {
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    '& .MuiSvgIcon-root': {
      color: '#fff',
    },
  },
});
