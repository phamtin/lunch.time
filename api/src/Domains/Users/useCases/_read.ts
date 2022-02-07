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
        const { q, sort, direction, page, limit, usePage } = query;

        let payload = {};

        if (q) payload['q'] = q;

        if (sort && ['asc', 'desc'].includes(direction)) {
            payload['sort'] = { [sort]: direction };
        }

        if (usePage) {
            payload['usePage'] = true;
            payload['page'] = page;
            payload['limit'] = limit;
        }

        return this.userRepository.findUsers(payload);
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
