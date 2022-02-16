export type BasicUser = {
  id: string;
  email: string;
  role: string;
  username: string;
  status: 'active' | 'inactive';
  familyName?: string;
  givenName?: string;
  phone?: string;
  addressLine?: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Admin = BasicUser & {
  password: string;
};

export type User = BasicUser & {
  idToken: string;
  social: string;
};

export interface CreateAdminInput {
  email: string;
  password: string;
  username: string;
  familyName: string;
  givenName: string;
  addressLine?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface UpdateUserInput {
  username: string;
  familyName: string;
  givenName: string;
  addressLine?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

export interface ParamsListUsers {
  id: string;
  page?: number;
  limit?: number;
  usePage?: boolean;
  q?: string | string[];
  sort?: string | string[];
  direction?: string | string[];
}
