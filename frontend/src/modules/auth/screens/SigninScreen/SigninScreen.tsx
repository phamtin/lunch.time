import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import theme from '@app/styles/theme';

import { useSignin } from '../../hooks/auth.hook';
import { LoginInput, validEmail } from '../../types/auth.type';

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const history = useHistory();
  const { mutate, isLoading } = useSignin();

  const submitSignin = (payload: LoginInput) => {
    return mutate(payload);
  };

  if (isLoading) return <span>Loading...</span>;

  const onSignup = () => {
    history.push('/signup');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'rgb(242, 245, 249)',
      }}
    >
      <Box
        sx={{
          width: '450px',
          p: '25px 35px 15px 35px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow:
            'rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px',
        }}
      >
        <img alt="main-icon" src="/ICON.png" width={55} />
        <Typography sx={{ fontWeight: 500, m: '10px 0 20px 0' }} variant="h6">
          Welcome back, Admin
        </Typography>
        <Box>
          <form onSubmit={handleSubmit(submitSignin)}>
            <Box sx={{ mb: '20px' }}>
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
                    value: validEmail,
                    message: 'Email is invalid',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    FormHelperTextProps={{
                      sx: { color: theme.palette.error.main },
                    }}
                    fullWidth
                    placeholder="Email address"
                    {...field}
                  />
                )}
              />
            </Box>
            <Box sx={{ mb: '10px' }}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
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
                    message: 'Password requires at least 4 characters',
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
                      sx: {
                        color: theme.palette.error.main,
                      },
                    }}
                    fullWidth
                    placeholder="Password"
                    {...field}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row-reverse',
              }}
            >
              <Typography>
                <strong>Lost password?</strong>
              </Typography>
            </Box>
            <Button
              fullWidth
              disabled={isLoading}
              type="submit"
              variant="contained"
              size="large"
              sx={{ m: '10px 0' }}
            >
              Sign in
            </Button>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Dont have an account?&nbsp;
              <Typography sx={{ cursor: 'pointer' }} onClick={onSignup}>
                <strong>Register</strong>
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
}
