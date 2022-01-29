import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Status } from 'src/API/Users/users.constant';
import { GetUser } from 'src/Domains/Users/useCases/_read';

@Injectable()
export class isAdmin implements CanActivate {
    constructor(private getUser: GetUser) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (request.currentUser.role === 'admin') {
            return true;
        }
        return false;
    }
}
