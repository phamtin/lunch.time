import { makeStyles } from '@mui/styles';

import theme from '@app/styles/theme';

export const useStyles = makeStyles({
  helperText: {
    color: 'red',
  },
  form: {
    border: '1px solid red',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgb(242, 245, 249)',
  },
  subContainer: {
    width: '450px',
    padding: '25px 35px 15px 35px',
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow:
      'rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px',
  },
  title: {
    fontWeight: 500,
    margin: '10px 0 20px 0',
  },
  input: {
    marginBottom: '15px',
  },
  errorText: {
    color: 'red',
  },
  loginButton: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  loginButtonTitle: {
    cursor: 'pointer',
  },
  button: {
    marginTop: '10px',
  },
});
