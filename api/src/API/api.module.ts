import { Module } from '@nestjs/common';
import { DomainModule } from 'src/Domains/domains.module';
import { UserController } from './Users/users.controller';

@Module({
    controllers: [UserController],
    imports: [DomainModule],
})
export class ApiModule {}
