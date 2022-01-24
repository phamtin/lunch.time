export type BasicUser = {
  _id: string;
  email: string;
  role: string;
  username: string;
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
  idToken?: string;
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
