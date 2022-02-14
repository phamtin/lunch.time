/* eslint-disable @typescript-eslint/no-explicit-any */
import qs from 'qs';

interface ParsedQsParams {
  [key: string]: undefined | string | string[] | null;
}
export function setQueryParams(params: any) {
  return qs.stringify(params, { arrayFormat: 'brackets' });
}

export function getQueryParams(path: string) {
  return qs.parse(path, { ignoreQueryPrefix: true }) as ParsedQsParams;
}
