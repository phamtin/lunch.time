import { Role } from 'src/API/Users/users.constant';

export class SignupAdminDto {
    email: string;
    password: string;
    username: string;
    givenName: string;
    familyName: string;
    role: Role.admin;
    phone?: string;
    avatarUrl?: string;
    addressLine?: string;
}

export class SigninDto {
    email: string;
    password: string;
}

export class SigninSocialDto {
    email: string;
    idToken: string;
    familyName: string;
    givenName: string;
    avatarUrl: string;
    username: string;
}
