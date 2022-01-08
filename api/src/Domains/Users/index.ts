import { Social, Status } from 'src/API/Users/users.constant';

export type Users = {
    _id?: string;
    email: string;
    social: Social;
    idToken: string;
    username: string;
    password?: string;
    givenName?: string;
    familyName?: string;
    addressLine?: string;
    photo?: string;
    phone?: string;
    status: Status;
    deletedAt?: string;
    createdAt: string;
    updatedAt: string;
};
