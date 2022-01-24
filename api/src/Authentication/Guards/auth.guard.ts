import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Status } from 'src/API/Users/users.constant';
import { GetUser } from 'src/Domains/Users/useCases/_read';
import { CryptoService } from 'src/Shared/services/crypto.service';

const cors = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, HEAD, OPTIONS',
    'Access-Control-Allow-Headers':
        'Accept,Access-Control-Allow-Headers,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With',
};
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private cryptoService: CryptoService, private getUser: GetUser) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        let authorised = false;

        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        let settings = Object.keys(cors).map((key) => {
            return [key, cors[key]];
        });
        response.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        response.header(
            'Access-Control-Allow-Origin',
            'https://frontend-phamtin.cloud.okteto.net',
        );

        for (let i = 0; i < settings.length; i++) {
            response.header(settings[i][0], settings[i][1]);
        }

        if ('OPTIONS' == request.method) {
            response.sendStatus(200);
        } else {
            true;
        }

        const authorization = request.headers['authorization'];
        if (!authorization) throw new ForbiddenException('Not authorised');

        const [type, token] = authorization.split(' ');

        if (!authorization || type !== 'API') {
            throw new ForbiddenException('Not authorised');
        }

        try {
            const verified = this.cryptoService.verifyJWT(token);
            const userId = verified.userId;

            const currentUser = await this.getUser.GetById(userId);
            if (!currentUser) throw new ForbiddenException('User Not found...');

            if (currentUser.status !== Status.active) {
                throw new ForbiddenException('User inactive');
            }
            request.currentUser = currentUser;
            authorised = true;
        } catch (e) {
            if (e.message.includes('expired')) {
                throw new ForbiddenException('Token expired');
            }

            throw new ForbiddenException('Token invalid');
        }

        return authorised;
    }
}
