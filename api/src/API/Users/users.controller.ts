import { Controller, Body, UseGuards, Get, Param, Patch, Req } from '@nestjs/common';
import { isAdmin } from 'src/Authentication/Guards/admin.guard';

import { AuthGuard } from 'src/Authentication/Guards/auth.guard';
import { GetUser } from 'src/Domains/Users/useCases/_read';
import { UpdateUser } from 'src/Domains/Users/useCases/_update';
import { UpdateProfileDto } from './users.dto';

@UseGuards(AuthGuard)
@Controller()
export class UserController {
    constructor(private getUser: GetUser, private updateUser: UpdateUser) {}

    @UseGuards(isAdmin)
    @Patch('manage/users/:id')
    async updateProfileByAdmin(@Param() { id }: any, @Body() payload: UpdateProfileDto) {
        return await this.updateUser.UpdateByAdmin(id, payload);
    }

    @Get('users/me')
    async getProfile(@Req() req: any) {
        return await this.getUser.GetById(req.currentUser._id);
    }

    @Patch('users/:id')
    async updateProfile(@Param() { id }: any, @Body() payload: UpdateProfileDto) {
        return await this.updateUser.Update(id, payload);
    }
}
