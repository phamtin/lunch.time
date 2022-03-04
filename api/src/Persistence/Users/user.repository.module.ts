import { Module } from '@nestjs/common';
import { SharedModule } from 'src/Shared/shared.module';

import { UserRepoProvider } from './user.persistence.provider';

@Module({
    imports: [SharedModule],
    providers: [UserRepoProvider],
    exports: [UserRepoProvider],
})
export class UserRepositoryModule {}
