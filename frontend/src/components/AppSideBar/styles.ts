import { makeStyles } from '@mui/styles';

import theme from '@app/styles/theme';
import {
  APP_SIDEBAR_WIDTH,
  APP_SIDEBAR_WIDTH_SMALL,
} from '@app/utils/constants/constants';

export const useStyles = makeStyles({
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
    backgroundColor: 'rgb(17, 25, 42)',
    transition: '0.4s',
  },
  list: {
    marginBottom: '10px!important',
    overflow: 'hidden',
    color: theme.palette.grey[400],
    '& .MuiListItem-root': {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: '12px',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
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
    '& .MuiSvgIcon-root': {
      transition: '0.4s',
      fontSize: '25px',
      justifyContent: 'center',
      marginRight: 0,
      marginLeft: '15px',
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
});
