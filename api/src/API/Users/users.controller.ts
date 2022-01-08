import { Controller, UseGuards, Get, Param, Patch, Req } from '@nestjs/common';

import { AuthGuard } from 'src/Authentication/Guards/auth.guard';
import { CreateUser } from 'src/Domains/Users/useCases/_create';
import { GetUser } from 'src/Domains/Users/useCases/_read';
import { UpdateUser } from 'src/Domains/Users/useCases/_update';
import { UpdateProfileDto } from './users.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(
        private getUser: GetUser,
        private createUser: CreateUser,
        private update: UpdateUser,
    ) {}

    @Get('me')
    async getUserProfile(@Req() req: any) {
        return await this.getUser.GetById(req.currentUser._id);
    }

    @Patch()
    async updateUserProfile(@Req() req: any, payload: UpdateProfileDto) {
        return await this.update.Update(req.currentUser._id, payload);
    }
}
