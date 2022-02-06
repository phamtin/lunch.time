import { Injectable, Inject } from '@nestjs/common';
import { Users } from '..';
import { IUserRepository } from '../IUsers.repository';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class GetUser {
    constructor(@UserRepo() private readonly userRepository: IUserRepository) {}

    /**
     *  [ MANAGE ]: Admin get list users
     *  ---------------------------------
     */
    public async GetUsersByAdmin(query: Record<string, string>): Promise<any> {
        const { q } = query;

        let criteria = {};

        if (q) {
            const pattern = new RegExp(q);
            criteria = {
                $or: [
                    { email: { $regex: pattern, $options: 'i' } },
                    { username: { $regex: pattern, $options: 'i' } },
                    { givenName: { $regex: pattern, $options: 'i' } },
                    { familyName: { $regex: pattern, $options: 'i' } },
                ],
            };
        }

        return this.userRepository.findUsers(criteria, '-password -__v');
    }

    /**
     *  [ APP ]: Get user detail
     *  --------------------------
     */
    public async GetById(id: string, options?: Partial<Users>): Promise<any> {
        return this.userRepository.findUserById(id, options);
    }

    /**
     *  [ APP ]: Get user by Email
     *  ----------------------------
     */
    public async GetByEmail(email: string): Promise<any> {
        return this.userRepository.findUserByEmail(email);
    }
}
