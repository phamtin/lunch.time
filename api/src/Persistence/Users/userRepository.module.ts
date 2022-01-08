import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './user.entity';
import { UserRepoProvider } from './userPersistence.provider';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
    providers: [UserRepoProvider],
    exports: [UserRepoProvider],
})
export class UserRepositoryModule {}
