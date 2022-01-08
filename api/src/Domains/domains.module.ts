import { Module } from '@nestjs/common';

import { UserModule } from './Users/users.module';

@Module({
    imports: [UserModule],
    exports: [UserModule],
})
export class DomainModule {}
