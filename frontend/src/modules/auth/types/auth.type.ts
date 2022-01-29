export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  email: string;
  password: string;
  username: string;
};

export const EMAIL_REGEX = /^((?!\.)[\w\-_.+]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
