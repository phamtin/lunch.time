import { AxiosResponse } from 'axios';

import { api } from '@app/api/api';

export const getStatsApi = ({
  from,
  to,
}: {
  from: string;
  to: string;
}): Promise<AxiosResponse> => {
  const url = 'aaaaaaaa/:from/bbbbbbbbb/:to/cccccccc'
    .replace(':from', from)
    .replace(':to', to);
  return api.get(url);
};
