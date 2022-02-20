import { useMutation, useQuery, useQueryClient } from 'react-query';

import { toastify } from '@app/components/Snackbar/SnackBar';

import { createAdminApi, getUsersApi, updateUserApi } from '../api/users.api';
import { User } from '../types/users.type';

export const useGetUsers = (params: any) => {
  return useQuery(['users/useGetUsers', params], () => getUsersApi(params), {
    onError: (err: Error) => {
      toastify('error', err.message);
    },
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation(createAdminApi, {
    onSuccess: data => {
      toastify('success', 'Admin created successfully');
      queryClient.setQueriesData('users/useGetUsers', (prev: any) => {
        prev.data.data = prev.data.data.concat(data.data.user);
        return prev;
      });
    },
    onError: (err: Error) => {
      toastify('error', err.message);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUserApi, {
    onSuccess: data => {
      toastify('success', 'User updated successfully');
      queryClient.setQueriesData('users/useGetUsers', (prev: any) => {
        prev.data.data = prev.data.data?.map((u: User) =>
          u.id === data?.data.id ? data.data : u
        );
        return prev;
      });
    },
    onError: (err: Error) => {
      toastify('error', err.message);
    },
  });
};
