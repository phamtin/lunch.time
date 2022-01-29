import { Role, Social, Status } from 'src/API/Users/users.constant';

export type Users = {
    _id?: any;
    email: string;
    social?: Social;
    idToken?: string;
    username: string;
    role: Role;
    password?: string;
    givenName?: string;
    familyName?: string;
    addressLine?: string;
    avatarUrl?: string;
    phone?: string;
    status: Status;
    deletedAt?: string;
    createdAt?: string;
    updatedAt?: string;
};
