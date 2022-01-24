import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import theme from '@app/styles/theme';

import { RegisterInput, EMAIL_REGEX } from '../../types/auth.type';
import { useStyles } from './styles';

const SignupScreen = () => {
  const classes = useStyles();
  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>();

  const submitSignup = () => {
    history.push('/signin');
  };

  const onLogin = () => {
    history.push('/signin');
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.subContainer}>
        <img alt="main-icon" src="/ICON.png" width={55} />
        <Typography className={classes.title} variant="h6">
          Welcome new, Admin
        </Typography>
        <Box>
          <form onSubmit={handleSubmit(submitSignup)}>
            <Box className={classes.input}>
              <Controller
                name="email"
                defaultValue=""
                control={control}
                rules={{
                  required: {
                    message: 'This field is required',
                    value: true,
                  },
                  pattern: {
                    value: EMAIL_REGEX,
                    message: 'Email is invalid',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    FormHelperTextProps={{
                      className: classes.errorText,
                    }}
                    fullWidth
                    placeholder="Email address"
                    {...field}
                  />
                )}
              />
            </Box>
            <Box className={classes.input}>
              <Controller
                name="password"
                defaultValue=""
                control={control}
                rules={{
                  required: {
                    message: 'This field is required',
                    value: true,
                  },
                  maxLength: {
                    message: 'Password requires no more than 12 characters',
                    value: 32,
                  },
                  minLength: {
                    message: 'Password requires at least 8 characters',
                    value: 4,
                  },
                }}
                render={({ field }) => (
                  <TextField
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    FormHelperTextProps={{
                      className: classes.errorText,
                    }}
                    fullWidth
                    placeholder="Password"
                    {...field}
                  />
                )}
              />
            </Box>
            <Box className={classes.input}>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: {
                    message: 'This field is required',
                    value: true,
                  },
                  minLength: {
                    message: 'Username requires at least 2 characters',
                    value: 2,
                  },
                  maxLength: {
                    message: "Username's too long",
                    value: 64,
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Username"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    FormHelperTextProps={{
                      className: classes.errorText,
                    }}
                    fullWidth
                    placeholder="Username"
                    {...field}
                  />
                )}
              />
            </Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              className={classes.button}
            >
              Sign up
            </Button>
            <Box className={classes.loginButton}>
              Already have an account?&nbsp;
              <Typography className={classes.loginButtonTitle} onClick={onLogin}>
                <strong>Login</strong>
              </Typography>
            </Box>
          </form>
        </Box>
        <br />
        <br />
        <br />
        <Typography sx={{ color: theme.palette.grey[400] }}>
          Lunchtime Dashboard Ⓒ 2022
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupScreen;
