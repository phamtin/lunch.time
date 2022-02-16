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
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: '10px',
    padding: '4px 10px',
    marginRight: '10px',
    '&:hover': {
      border: `1px solid ${theme.palette.primary.light}`,
    },
  },
  formSearch: {
    width: '100%',
    '& .input': {
      border: 0,
      padding: '4.5px 10px',
      flex: 1,
      outline: 'none',
      fontSize: '16px',
      '&::placeholder': {
        color: `${theme.palette.grey[400]}`,
        fontSize: 14,
      },
    },
  },
});
