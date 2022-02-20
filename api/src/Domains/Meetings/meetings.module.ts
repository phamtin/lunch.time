import { Module } from '@nestjs/common';

import { UserRepositoryModule } from 'src/Persistence/Users/user.repository.module';
import { UserController } from 'src/API/Users/users.controller';
import { GetMeeting } from './useCases/_read';
import { CreateMeeting } from './useCases/_create';

@Module({
    imports: [UserRepositoryModule],
    controllers: [UserController],
    providers: [GetMeeting, CreateMeeting],
    exports: [GetMeeting, CreateMeeting],
})
export class MeetingModule {}
