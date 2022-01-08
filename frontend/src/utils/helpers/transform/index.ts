/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
import camelCase from 'lodash.camelcase';
import get from 'lodash.get';

export type ObjectType = {
  [key: string]: unknown;
};

export const isArray = (d: any) => Array.isArray(d);

export const isObject = (d: any) =>
  d === Object(d) && !isArray(d) && typeof d !== 'function';

export const toCamelCase = (d: any, filter?: boolean) => {
  if (isObject(d)) {
    const o: any = {};
    Object.keys(d).forEach(k => {
      o[camelCase(k)] = toCamelCase(d[k], true);
    });

    return o;
  }
  if (isArray(d)) {
    return d.map((o: any) => toCamelCase(o, true));
  }

  if (filter && d === '') {
    return null;
  }

  return d;
};

export function trimValue<T extends unknown>(d: T): T | ObjectType {
  if (typeof d === 'string') {
    return d.trim() as T;
  }

  if (isObject(d)) {
    const o: ObjectType = {};
    Object.keys(d as Record<string, unknown>).forEach(k => {
      o[k] = trimValue(get(d, k) as T);
    });

    return o;
  }

  if (isArray(d)) {
    return (d as Array<unknown>).map((i: unknown) => trimValue(i)) as T;
  }

  return d;
}
