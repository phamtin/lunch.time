import { Inject, Injectable } from '@nestjs/common';
import { RedisCacheService } from 'src/Shared/services/redisCache.service';
import { RepoPayload } from 'src/utils/types/app.type';
import { Users } from '..';
import { IUserRepository } from '../IUsers.repository';
import { UserRepoPayload } from '../user.type';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export default class UserCache {
    private prefix = 'USERS:';
    private USERS_CACHE_TTL = 1 * 1; //  1 minute

    constructor(
        @UserRepo() private readonly userRepository: IUserRepository,
        private readonly redisCacheService: RedisCacheService,
    ) {}

    setListUsers(key: UserRepoPayload & RepoPayload, value: Users[]) {
        return this.redisCacheService.setData(
            `${this.prefix}${JSON.stringify(key)}`,
            JSON.stringify(value),
            this.USERS_CACHE_TTL,
        );
    }

    public async getListUsers(criteria: UserRepoPayload & RepoPayload) {
        let users = await this.redisCacheService.getData(
            `${this.prefix}${JSON.stringify(criteria)}`,
        );
        if (users) {
            console.log('GET DATA FROM REDIS');
            if (typeof users === 'string') users = JSON.parse(users);
        } else {
            users = await this.userRepository.findUsers(criteria);
            this.setListUsers(criteria, users as Users[]);
        }

        return users;
    }
}
