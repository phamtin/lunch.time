import { Module } from '@nestjs/common';

import { UserModule } from './Users/users.module';
import { MeetingModule } from './Meetings/meetings.module';

@Module({
    imports: [UserModule, MeetingModule],
    exports: [UserModule, MeetingModule],
})
export class DomainModule {}
