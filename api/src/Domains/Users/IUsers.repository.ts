import { Users } from './index';

export interface IUserRepository {
    createUser(payload: Partial<Users>);

    findUsers(criteria: any, select: Partial<Users>);

    findUserById(id: string, option: Partial<Users>);

    findUserByEmail(email: string);

    updateUserById(id: string, modifier: Partial<Users>);
}
