import { makeStyles } from '@mui/styles';

import theme from '@app/styles/theme';

export const useStyles = makeStyles({
  dialogWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    '& .MuiDialog-container': {
      width: '100%',
    },
  },
  header: {
    padding: `${theme.spacing(2.5)} ${theme.spacing(3)}`,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    '& h2': {
      padding: 0,
      fontWeight: 600,
    },
  },
  infoArea: {
    display: 'flex',
    padding: '26px',
  },
  forms: {
    flex: '0 1 59%',
  },
  upload: {
    flex: '1 0',
    paddingLeft: '12.5%',
    paddingTop: '6%',
  },
  uploadIcon: {
    color: '#e6e6e6',
    padding: '12px',
    marginLeft: '21%',
    marginTop: '-10%',
    boxShadow: '1px 6px 10px #a6aaf5',
    backgroundColor: theme.palette.primary.main,
  },
  footer: {
    padding: '24px',
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
});
