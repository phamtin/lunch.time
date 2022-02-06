import { makeStyles } from '@mui/styles';

import theme from '@app/styles/theme';

export const useStyles = makeStyles({
  selectedNumber: {
    flex: '1 1 100%',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '8px',
    padding: '5px 10px',
  },
  input: {
    border: 0,
    padding: '5px 10px',
    flex: 1,
    outline: 'none',
    fontSize: '16px',
  },
});
