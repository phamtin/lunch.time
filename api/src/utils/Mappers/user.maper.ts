import { UpdateProfileDto } from 'src/API/Users/users.dto';
import { Users } from 'src/Domains/Users';

export class UserMapper {
    public static updateToDomain(update: UpdateProfileDto): Partial<Users> {
        const partialUser: Partial<Users> = {
            username: update.username ?? undefined,
            givenName: update.givenName ?? undefined,
            familyName: update.familyName ?? undefined,
            password: update.password ?? undefined,
            phone: update.phone ?? undefined,
            status: update.status ?? undefined,
            avatarUrl: update.avatarUrl ?? undefined,
            addressLine: update.addressLine ?? undefined,
        };

        for (let i = 0; i < Object.keys(partialUser).length; i++) {
            if (partialUser[Object.keys(partialUser)[i]] === undefined) {
                delete partialUser[Object.keys(partialUser)[i]];
            }
        }

        return partialUser;
    }
}
