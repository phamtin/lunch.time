import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useSignin } from '../../hooks/auth.hook';
import { LoginInput } from '../../types/auth.type';

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
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
            <Box sx={{ mb: 3 }}>
              <Controller
                name="email"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Email"
                    error={!isValid}
                    helperText={errors.email?.message}
                    fullWidth
                    placeholder="Email address"
                    {...field}
                  />
                )}
              />
            </Box>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Password"
                  type="password"
                  error={!isValid}
                  helperText={errors.password?.message}
                  fullWidth
                  placeholder="Password"
                  {...field}
                />
              )}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row-reverse',
                m: '10px 0 20px 0',
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
            >
              Sign in
            </Button>
            <Box
              sx={{
                mt: '10px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Dont have an account? &nbsp;
              <Typography sx={{ cursor: 'pointer' }} onClick={onSignup}>
                <strong>Register</strong>
              </Typography>
            </Box>
          </form>
        </Box>
        <br />
        <br />
        <br />
        <Typography>Lunchtime Dashboard Ⓒ 2022</Typography>
      </Box>
    </Box>
  );
}
