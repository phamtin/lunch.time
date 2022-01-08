import { Injectable, Inject } from '@nestjs/common';
import { Users } from '..';
import { IUserRepository } from '../IUsers.repository';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class GetUser {
    constructor(@UserRepo() private readonly userRepository: IUserRepository) {}

    public async GetById(id: string, options?: Partial<Users>): Promise<any> {
        return this.userRepository.findUserById(id, options);
    }

    public async GetByEmail(email: string): Promise<any> {
        return this.userRepository.findUserByEmail(email);
    }
}
