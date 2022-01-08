import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

type PayloadData = {
    [key: string]: any;
};

export interface JWTParam {
    data: PayloadData;
    expiresIn: number;
}

@Injectable()
export class CryptoService {
    constructor(private jwtService: JwtService) {}

    async hashPassword(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buf = (await promisify(scrypt)(password, salt, 64)) as Buffer;

        return `${buf.toString('hex')}.${salt}`;
    }

    async comparePassword(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = (await promisify(scrypt)(suppliedPassword, salt, 64)) as Buffer;

        return buf.toString('hex') === hashedPassword;
    }

    generateJWT({ data, expiresIn }: JWTParam) {
        return this.jwtService.sign(data, { expiresIn });
    }

    verifyJWT(token: string) {
        return this.jwtService.verify(token);
    }

    decodeJWT(token: string) {
        return this.jwtService.decode(token, {
            complete: true,
            json: true,
        });
    }
}
