import { Module } from '@nestjs/common';

import { UserRepositoryModule } from './Users/userRepository.module';

@Module({
    imports: [UserRepositoryModule],
    exports: [UserRepositoryModule],
})
export class PersistenceModule {}
