import {
    Controller,
    Post,
    Body,
    UseGuards,
    Get,
    Param,
    Patch,
    Req,
    Query,
} from '@nestjs/common';
import { isAdmin } from 'src/Authentication/Guards/admin.guard';

import { AuthGuard } from 'src/Authentication/Guards/auth.guard';
import { CreateMeeting } from 'src/Domains/Meetings/useCases/_create';
import { GetMeeting } from 'src/Domains/Meetings/useCases/_read';
import { AdminGetMeetingsValidation } from './meetings.validation';

@UseGuards(AuthGuard)
@Controller()
export class MeetingController {
    constructor(private getMeeting: GetMeeting, private create: CreateMeeting) {}

    /**
     *  [ MANAGE ]: Admin get list meetings
     *  ------------------------------------
     */
    @UseGuards(isAdmin)
    @Get('manage/meetings')
    async getMeetingsByAdmin(@Query(new AdminGetMeetingsValidation()) query) {
        return await this.getMeeting.GetMeetingsByAdmin;
    }

    /**
     *  [ MANAGE ]: Admin create new meeting
     *  -------------------------------------
     */
    @UseGuards(isAdmin)
    @Post('manage/meetings')
    async createMeetingByAdmin(@Query() payload: any) {
        return await this.create.CreateByAdmin(payload);
    }

    /**
     *  [ MANAGE ]: Admin update detail meeting
     *  ----------------------------------------
     */
    @UseGuards(isAdmin)
    @Patch('manage/meetings/:id')
    async updateProfileByAdmin(@Param() { id }: any, @Body() payload: any) {
        // return await this.updateUser.UpdateByAdmin(id, payload);
    }

    /**
     *  [ APP ]: User get list meetings
     *  --------------------------------
     */
    @Get('meetings')
    async getProfile(@Req() req: any) {
        // return await this.getUser.GetById(req.currentUser._id);
    }

    /**
     *  [ APP ]: User create new meeting
     *  ---------------------------------
     */
    @Post('meetings/:id')
    async createMeeting(@Body() payload: any) {
        // return await this.updateUser.Update(id, payload);
    }

    /**
     *  [ APP ]: User update their own meeting
     *  ---------------------------------------
     */
    @Patch('users/:id')
    async updateMeeting(@Param() { id }: any, @Body() payload: any) {
        // return await this.updateUser.Update(id, payload);
    }
}
