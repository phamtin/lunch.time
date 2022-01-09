import { useMutation, useQuery } from 'react-query';

import { toastify } from '@app/components/Snackbar/SnackBar';
import { removeToken, setCurrentUser, setToken } from '@app/utils/common/storage';

import { logoutApi, signinApi } from '../api/auth.api';

export const useSignin = () => {
  return useMutation(signinApi, {
    onSuccess: () => {
      toastify('success', 'Successfully');
    },
    onError: (err: string) => {
      toastify('error', err);
    },
    onMutate: () => {
      setCurrentUser({
        id: 1,
        email: 'tinphamtp@gmail.com',
      });
      setToken('abc123');
      window.location.pathname = '/';
    },
  });
};

export const useLogout = () => {
  return useMutation(logoutApi, {
    onSuccess: () => {
      toastify('success', 'Successfully');
    },
    onError: (err: string) => {
      toastify('error', err);
    },
    onMutate: () => {
      removeToken();
      window.location.pathname = '/signin';
    },
  });
};

export const useGetData = () => {
  return useQuery(
    ['auth/useGetData'],
    () => {
      return [
        { id: 1, key: 'A4' },
        { id: 2, key: 'RS7' },
        { id: 3, key: 'C63' },
      ];
    },
    {
      enabled: false,
      onSuccess: () => {
        toastify('success', 'Successfully');
      },
      onError: err => {
        toastify('error', err as string);
      },
    }
  );
};
