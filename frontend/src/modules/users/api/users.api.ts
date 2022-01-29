import { api } from '@app/api/api';

import { UsersEndpoints } from '../constants/users.endpoint';
import { CreateAdminInput, UpdateUserInput } from '../types/users.type';

export const createAdminApi = ({ data }: { data: CreateAdminInput }) => {
  const url = UsersEndpoints.ADMIN;
  return api.post(url, data);
};

export const updateUserApi = ({
  data,
  userId,
}: {
  data: UpdateUserInput;
  userId: string;
}) => {
  const url = UsersEndpoints.UPDATE_USER.replace(':id', userId);
  return api.patch(url, data);
};
