import { Module } from '@nestjs/common';
import { DomainModule } from 'src/Domains/domains.module';
import { UserController } from './Users/users.controller';
import { MeetingController } from './Meetings/meetings.controller';

@Module({
    controllers: [UserController,MeetingController],
    imports: [DomainModule],
})
export class ApiModule {}
