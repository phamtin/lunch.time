import { Provider } from '@nestjs/common';

import { UserRepository } from './repository';

export const UserRepoProvider: Provider = {
    provide: 'UserRepo',
    useClass: UserRepository,
};
