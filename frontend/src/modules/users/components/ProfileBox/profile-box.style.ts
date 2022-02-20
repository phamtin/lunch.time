import { makeStyles } from '@mui/styles';

import theme from '@app/styles/theme';

export const useStyles = makeStyles({
  wrap: {
    display: 'flex',
    alignItems: 'center',
    margin: '12px 0',
  },
  avatar: {
    marginRight: '9px',
  },
  username: {
    color: theme.palette.primary.dark,
  },
  title: {
    color: theme.palette.text.secondary,
  },
});
