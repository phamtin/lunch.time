import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Status } from 'src/API/Users/users.constant';
import { CreateUser } from 'src/Domains/Users/useCases/_create';
import { GetUser } from 'src/Domains/Users/useCases/_read';
import { CryptoService } from 'src/Shared/services/crypto.service';

import { SigninDto, SigninSocialDto, SignupDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private getUser: GetUser,
        private createUser: CreateUser,
        private cryptoService: CryptoService,
    ) {}

    async login(data: SigninDto) {
        const user = await this.getUser.GetByEmail(data.email);
        console.log({ user });

        if (!user) {
            throw new NotFoundException('User with this email is not found');
        }
        if (user.status !== Status.active) {
            throw new ForbiddenException('This account is inactive now');
        }

        const isValidPassword = await this.cryptoService.comparePassword(
            user.password,
            data.password,
        );
        if (!isValidPassword) {
            throw new ForbiddenException('Invalid credentials');
        }

        const token = this.cryptoService.generateJWT({
            data: {
                type: 'access',
                userId: user._id,
            },
            expiresIn: 5 * 60 * 1000,
        });

        user.password = undefined;
        return { user, token };
    }

    async signup(data: SignupDto) {
        const existedUser = await this.getUser.GetByEmail(data.email);

        if (existedUser) {
            throw new BadRequestException('User existed');
        }

        const hashedPassword = await this.cryptoService.hashPassword(data.password);

        const newUser = await this.createUser.Create({
            ...data,
            password: hashedPassword,
        });
        newUser.password = undefined;

        return { user: newUser };
    }

    async loginWithGoogle(data: SigninSocialDto) {
        console.log('Google sign in - START');

        let token: string, signedUser: Record<string, string>;
        const { email, idToken, familyName, givenName, username, photo } = data;

        const user = await this.getUser.GetByEmail(email);

        if (user) {
            if (!user.social) {
                throw new BadRequestException('User existed, please login with password.');
            }
            if (user.social === 'facebook') {
                throw new BadRequestException('User existed');
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
                photo,
                social: 'google',
            });
            signedUser = newUser;
        }

        token = this.cryptoService.generateJWT({
            data: {
                type: 'access',
                userId: signedUser._id,
            },
            expiresIn: 5 * 60 * 1000,
        });

        console.log('Google sign in - SUCCESS');
        return { user: signedUser, token };
    }
}
