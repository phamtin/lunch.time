import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'rgb(17, 25, 42)',
    transition: '0.4s',
  },
  list: {
    color: 'rgba(255,255,255,0.7)',
    paddingLeft: '30px',
    flex: 1,
  },
  listText: {
    color: 'rgba(255,255,255,0.5)',
  },
});
