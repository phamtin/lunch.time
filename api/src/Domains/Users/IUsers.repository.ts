import { Users } from './index';

export interface IUserRepository {
    count(criteria: Partial<Users>);

    createUser(payload: Partial<Users>);

    findUsers(payload: any);

    findUserById(id: string, option: Partial<Users>);

    findUserByEmail(email: string);

    updateUserById(id: string, modifier: Partial<Users>);
}
