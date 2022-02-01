import { Controller, Body, UseGuards, Get, Param, Patch, Req, Query } from '@nestjs/common';
import { isAdmin } from 'src/Authentication/Guards/admin.guard';

import { AuthGuard } from 'src/Authentication/Guards/auth.guard';
import { GetUser } from 'src/Domains/Users/useCases/_read';
import { UpdateUser } from 'src/Domains/Users/useCases/_update';
import { UpdateProfileDto } from './users.dto';
import { AdminGetUsersValidation } from './validations/user.validation';

@UseGuards(AuthGuard)
@Controller()
export class UserController {
    constructor(private getUser: GetUser, private updateUser: UpdateUser) {}

    /**
     *  [ MANAGE ]: Admin get list users
     *  ---------------------------------
     */
    @UseGuards(isAdmin)
    @Get('manage/users')
    async getUsers(@Query(new AdminGetUsersValidation()) query: any) {
        return await this.getUser.GetUsersByAdmin(query);
    }

    /**
     *  [ MANAGE ]: Admin update user profile
     *  --------------------------------------
     */
    @UseGuards(isAdmin)
    @Patch('manage/users/:id')
    async updateProfileByAdmin(@Param() { id }: any, @Body() payload: UpdateProfileDto) {
        return await this.updateUser.UpdateByAdmin(id, payload);
    }

    /**
     *  [ APP ]: User get their detail profile
     *  ----------------------------------------
     */
    @Get('users/me')
    async getProfile(@Req() req: any) {
        return await this.getUser.GetById(req.currentUser._id);
    }

    /**
     *  [ APP ]: User update their profile
     *  ------------------------------------
     */
    @Patch('users/:id')
    async updateProfile(@Param() { id }: any, @Body() payload: UpdateProfileDto) {
        return await this.updateUser.Update(id, payload);
    }
}
