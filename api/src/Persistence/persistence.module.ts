import { Module } from '@nestjs/common';

import { UserRepositoryModule } from './Users/user.repository.module';

@Module({
    imports: [UserRepositoryModule],
    exports: [UserRepositoryModule],
})
export class PersistenceModule {}
