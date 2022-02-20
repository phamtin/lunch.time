import { Role, Social, Status } from 'src/API/Users/users.constant';
import { Users } from '../Users';

export type Meeting = {
    _id: string;
    title: string;
    subtitle: string;
    organizer: string;
    participants: Users[];
    status: Status;
    deadline: string;
    startedAt: string;
    deletedAt?: string;
    createdAt?: string;
    updatedAt?: string;
};
