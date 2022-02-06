/* eslint-disable  @typescript-eslint/no-explicit-any */

import { AddCircleOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { EMAIL_REGEX } from '@app/modules/auth/types/auth.type';
import { validateFields } from '@app/utils/helpers/validate/field.validate';

import { renderFunctionalityText } from '../../helpers/users.helper';
import { CreateAdminInput, UpdateUserInput, User } from '../../types/users.type';
import { useStyles } from './create-user-dialog.style';

/**
 *    ------------------------------------------------------
 *
 *    This dialog used only for CREATE ADMIN and UPDATE USER.
 *
 *    ------------------------------------------------------
 */
interface CreateUpdateUserDialogProps {
  user?: User;
  onSubmit: (
    mode: 'create' | 'update',
    user: CreateAdminInput & UpdateUserInput,
    userId?: string
  ) => void;
  onClose: () => void;
}

const CreateUpdateUserDialog = ({
  user,
  onSubmit,
  onClose,
}: CreateUpdateUserDialogProps) => {
  const classes = useStyles();

  const isCreateAdmin = !user;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAdminInput & UpdateUserInput>({
    shouldUnregister: true,
    defaultValues: {
      email: user?.email ?? '',
      password: '',
      username: user?.username ?? '',
      familyName: user?.familyName ?? '',
      givenName: user?.givenName ?? '',
      addressLine: user?.addressLine ?? '',
      phone: user?.phone ?? '',
      avatarUrl: user?.avatarUrl ?? '',
    },
  });

  const onHandleSubmit = (data: CreateAdminInput & UpdateUserInput) => {
    if (user && Object.keys(user).length) {
      return onSubmit('update', data, user?._id); //  Update User
    }
    return onSubmit('create', data); //  Create Admin
  };

  return (
    <Dialog className={classes.dialogWrapper} open maxWidth="md">
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className={classes.header}>
          <DialogTitle>{renderFunctionalityText(user).title}</DialogTitle>
          <DialogContentText>
            {renderFunctionalityText(user).subtitle}
          </DialogContentText>
        </div>
        <div className={classes.infoArea}>
          <div className={classes.forms}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="username"
                  control={control}
                  rules={validateFields('User Name', true, 4, 64)}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="User name"
                      placeholder="User name"
                      error={!!errors.username}
                      helperText={errors.username?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="givenName"
                  control={control}
                  rules={validateFields('Given Name', true, 2, 32)}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Given name"
                      placeholder="Given name"
                      error={!!errors.givenName}
                      helperText={errors.givenName?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="familyName"
                  control={control}
                  rules={validateFields('Family Name', true, 2, 32)}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Family name"
                      placeholder="Family name"
                      error={!!errors.familyName}
                      helperText={errors.familyName?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    ...validateFields('Email address', true, 0, 64),
                    pattern: {
                      value: EMAIL_REGEX,
                      message: 'Email is invalid',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email address"
                      placeholder="Email address..."
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              {isCreateAdmin && (
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    rules={validateFields('Password', true, 4, 32)}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="password"
                        label="Password"
                        placeholder="Password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              )}
              <Grid item xs={6}>
                <Controller
                  name="addressLine"
                  control={control}
                  rules={validateFields('Address line', false, 4, 64)}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Address line"
                      placeholder="1st Andrew St, Block 2..."
                      error={!!errors.addressLine}
                      helperText={errors.addressLine?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    ...validateFields('Phone', false, 8, 12),
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Phone accept only numbers',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Phone"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.upload}>
            <Box
              sx={{
                borderRadius: '12px',
                border: '1px solid #e6e6e6',
                p: '28px 34px',
              }}
              component="img"
              src="/lunchtime-logo-small.png"
            />
            <br />
            <IconButton className={classes.uploadIcon}>
              <AddCircleOutlined />
            </IconButton>
          </div>
        </div>
        <DialogActions className={classes.footer}>
          <Button onClick={onClose}>Cancel</Button>&nbsp;
          <Button type="submit" variant="contained">
            {renderFunctionalityText(user).buttonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateUpdateUserDialog;
