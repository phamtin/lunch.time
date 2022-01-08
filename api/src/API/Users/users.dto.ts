import { Status } from './users.constant';

export interface CreateUserDto {
    email: string;
    password?: string;
    idToken?: string;
    social?: string;
    familyName?: string;
    givenName?: string;
    username: string;
    photo?: string;
}

export interface UpdateProfileDto {
    username?: string;
    addressLine?: string;
    givenName?: string;
    familyName?: string;
    photo?: string;
    phone?: string;
    status?: Status;
}
