import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from 'src/API/Users/users.dto';
import { SignupAdminDto } from 'src/Authentication/dto/auth.dto';

import { IUserRepository } from '../IUsers.repository';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class CreateUser {
    constructor(@UserRepo() private readonly userRepository: IUserRepository) {}

    public async Create(payload: CreateUserDto): Promise<any> {
        return this.userRepository.createUser(payload);
    }

    public async CreateAdmin(payload: SignupAdminDto): Promise<any> {
        return this.userRepository.createUser(payload);
    }
}
