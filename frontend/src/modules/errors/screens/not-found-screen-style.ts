import { makeStyles } from '@mui/styles';

import theme from '@app/styles/theme';

export const useStyle = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: '30px',
  },
  title: {
    marginBottom: 0,
  },
  caption: {
    color: theme.palette.grey[600],
  },
  img: {
    maxWidth: '36%',
    marginTop: '30px',
  },
});
