import { makeStyles } from '@mui/styles';

import theme from '@app/styles/theme';
import {
  APP_SIDEBAR_WIDTH,
  APP_SIDEBAR_WIDTH_SMALL,
} from '@app/utils/constants/constants';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'rgb(17, 25, 42)',
    transition: '0.4s',
    width: APP_SIDEBAR_WIDTH,
    paddingBottom: '20px',
  },
  smallWidthContainer: {
    width: APP_SIDEBAR_WIDTH_SMALL,
  },
  list: {
    flex: 1,
    color: theme.palette.grey[400],
    '& .MuiListItem-root': {
      '&:hover': {
        backgroundColor: theme.palette.grey[600],
        color: theme.palette.primary.contrastText,
      },
    },
    '& .MuiSvgIcon-root': { marginRight: '10px', fontSize: '24px' },
    '& span': {
      fontSize: '16px',
    },
  },
  smallList: {
    '& .MuiSvgIcon-root': { fontSize: '30px' },
    '& .MuiListItemText-root': { display: 'none' },
  },
  buttonContainer: {
    padding: '0 3px',
  },
  button: {
    borderRadius: 1000,
  },
});
