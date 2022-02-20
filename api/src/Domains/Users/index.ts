import { Role, Social, Status } from 'src/API/Users/users.constant';

export type Users = {
    _id?: any;
    email: string;
    status: Status;
    username: string;
    idToken?: string;
    role?: Role;
    social?: Social;
    password?: string;
    givenName?: string;
    familyName?: string;
    addressLine?: string;
    avatarUrl?: string;
    phone?: string;
    deletedAt?: string;
    createdAt?: string;
    updatedAt?: string;
};
