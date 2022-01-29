import { Social, Status } from './users.constant';

export interface CreateUserDto {
    email: string;
    idToken: string;
    social: Social;
    username: string;
    familyName?: string;
    givenName?: string;
    phone?: string;
    status?: Status;
    addressLine?: string;
    avatarUrl?: string;
}

export interface UpdateProfileDto {
    username?: string;
    password?: string;
    addressLine?: string;
    givenName?: string;
    familyName?: string;
    avatarUrl?: string;
    phone?: string;
    status?: Status;
}
