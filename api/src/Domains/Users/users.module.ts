import { Module } from '@nestjs/common';

import { UserRepositoryModule } from 'src/Persistence/Users/userRepository.module';
import { UserController } from 'src/API/Users/users.controller';
import { UpdateUser } from './useCases/_update';
import { GetUser } from './useCases/_read';
import { CreateUser } from './useCases/_create';

@Module({
    imports: [UserRepositoryModule],
    controllers: [UserController],
    providers: [GetUser, UpdateUser, CreateUser],
    exports: [GetUser, UpdateUser, CreateUser],
})
export class UserModule {}
