import { makeStyles } from '@mui/styles';

import theme from '@app/styles/theme';

export const useStyles = makeStyles({
  tableWrapper: {
    backgroundColor: '#fff',
    boxShadow: '0 3px 18px #d1d1d1',
    borderRadius: '8px',
    overflowX: 'auto',
  },
  optionCell: {
    '& .MuiButtonBase-root': { borderRadius: '10px' },
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
  },
});
