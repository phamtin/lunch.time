import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Role, Social, Status } from 'src/API/Users/users.constant';
import { CreateUser } from 'src/Domains/Users/useCases/_create';
import { GetUser } from 'src/Domains/Users/useCases/_read';
import { CryptoService } from 'src/Shared/services/crypto.service';

import { SigninDto, SigninSocialDto, SignupAdminDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private getUser: GetUser,
        private createUser: CreateUser,
        private cryptoService: CryptoService,
    ) {}

    /**
     *  [ MANAGE ]: Admin login to Dashboard
     *  -------------------------------------
     */
    async login(data: SigninDto) {
        const user = await this.getUser.GetByEmail(data.email);

        if (!user) {
            throw new NotFoundException('Admin with this email is not found');
        }
        if (user.status !== Status.active) {
            throw new ForbiddenException('This account is inactive now');
        }

        const isValidPassword = await this.cryptoService.comparePassword(
            user.password,
            data.password,
        );

        if (!isValidPassword) throw new BadRequestException('Invalid credentials');

        const token = this.cryptoService.generateJWT({
            data: {
                type: 'access',
                userId: user._id,
            },
            expiresIn: 60 * 60,
        });

        user.password = undefined;

        return { user, token };
    }

    /**
     *  [ MANAGE ]: Register a new Admin
     *  ---------------------------------
     */
    async signup(data: SignupAdminDto) {
        const existedUser = await this.getUser.GetByEmail(data.email);

        if (existedUser) {
            throw new BadRequestException('User existed');
        }

        const hashedPassword = await this.cryptoService.hashPassword(data.password);

        const newUser = await this.createUser.CreateAdmin({
            ...data,
            role: Role.admin,
            password: hashedPassword,
        });
        newUser.password = undefined;

        return { user: newUser };
    }

    /**
     *  [ APP ]: User login with Google account
     *  -----------------------------------------
     */
    async loginWithGoogle(data: SigninSocialDto) {
        let token: string, signedUser: Record<string, string>;
        const { email, idToken, familyName, givenName, username, avatarUrl } = data;

        const user = await this.getUser.GetByEmail(email);

        if (user) {
            if (!user.social) {
                throw new BadRequestException('User existed, please login with password.');
            }
            if (user.social === 'facebook') {
                throw new BadRequestException('User existed, please login with Facebook.');
            }
            if (user.status === 'inactive') {
                throw new BadRequestException('User inactive');
            }

            signedUser = user;
        } else {
            const newUser = await this.createUser.Create({
                email,
                idToken,
                familyName,
                givenName,
                username,
                avatarUrl,
                social: Social.google,
            });
            signedUser = newUser;
        }

        token = this.cryptoService.generateJWT({
            data: {
                type: 'access',
                userId: signedUser._id,
            },
            expiresIn: 60 * 60,
        });

        return { user: signedUser, token };
    }
}
