import { Injectable, Inject } from '@nestjs/common';
import { Users } from '..';
import { IUserRepository } from '../IUsers.repository';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class UpdateUser {
    constructor(@UserRepo() private readonly userRepository: IUserRepository) {}

    public async Update(userId: string, toUpdate: Partial<Users>): Promise<void> {
        await this.userRepository.updateUserById(userId, toUpdate);
    }
}
