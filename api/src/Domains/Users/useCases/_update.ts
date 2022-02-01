import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Users } from '..';
import { IUserRepository } from '../IUsers.repository';
import { GetUser } from './_read';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class UpdateUser {
    constructor(
        private getUser: GetUser,
        @UserRepo() private readonly userRepository: IUserRepository,
    ) {}

    public async Update(userId: string, toUpdate: Partial<Users>): Promise<void> {
        const user = await this.getUser.GetById(userId);

        if (!user) throw new NotFoundException('User not found');

        return this.userRepository.updateUserById(userId, toUpdate);
    }

    public async UpdateByAdmin(userId: string, toUpdate: Partial<Users>): Promise<void> {
        const user = await this.getUser.GetById(userId);

        if (!user) throw new NotFoundException('User not found');

        return this.userRepository.updateUserById(userId, toUpdate);
    }
}
