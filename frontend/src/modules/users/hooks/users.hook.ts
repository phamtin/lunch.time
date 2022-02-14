import { useMutation, useQuery } from 'react-query';

import { toastify } from '@app/components/Snackbar/SnackBar';

import { createAdminApi, getUsersApi, updateUserApi } from '../api/users.api';

export const useCreateAdmin = () => {
  return useMutation(createAdminApi, {
    onSuccess: () => {
      toastify('success', 'Admin created successfully');
    },
    onError: (err: Error) => {
      toastify('error', err.message);
    },
  });
};

export const useUpdateUser = () => {
  return useMutation(updateUserApi, {
    onSuccess: () => {
      toastify('success', 'User created successfully');
    },
    onError: (err: Error) => {
      toastify('error', err.message);
    },
  });
};

export const useGetUsers = (params: any) => {
  return useQuery(['users/useGetUsers', params], () => getUsersApi(params), {
    // enabled: false,
    onError: err => {
      toastify('error', err as string);
    },
  });
};
