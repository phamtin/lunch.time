import { Injectable, Inject } from '@nestjs/common';
import { RedisCacheService } from 'src/Shared/services/redisCache.service';
import { Direction, RepoPayload } from 'src/utils/types/app.type';
import { Users } from '..';
import UserCache from '../cache/user.cache';
import { IUserRepository } from '../IUsers.repository';
import { UserRepoPayload } from '../user.type';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class GetUser {
    constructor(
        @UserRepo() private readonly userRepository: IUserRepository,
        private readonly userCache: UserCache,
    ) {}

    /**
     *  [ MANAGE ]: Admin get list users
     *  ---------------------------------
     */
    public async GetUsersByAdmin(query: Record<string, string>): Promise<any> {
        const { q, sort, direction, page, limit, usePage, role } = query;

        let payload: UserRepoPayload & RepoPayload = {};

        if (role) payload['role'] = role;

        if (q) payload['q'] = q;

        if (sort && ['asc', 'desc'].includes(direction)) {
            payload['sort'] = { [sort]: direction as Direction };
        }

        if (usePage) {
            payload['usePage'] = true;
            payload['page'] = page;
            payload['limit'] = limit;
        }

        // payload['select'] = 'username email role status avatarUrl addressLine';

        return await this.userCache.getListUsers(payload);
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
