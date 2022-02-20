import { Injectable, Inject } from '@nestjs/common';

// import { IUserRepository } from '../IUsers.repository';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class CreateMeeting {
    constructor(@UserRepo() private readonly meetingRepository: any) {}

    /**
     *  [ MANAGE ]: Admin create new meeting
     *  -------------------------------------
     */
    public async CreateByAdmin(payload: any): Promise<any> {
        return this.meetingRepository.createMeeting(payload);
    }

    /**
     *  [ USER ]: User create new meeting
     *  -------------------------------------
     */
    public async Create(payload: any): Promise<any> {
        return this.meetingRepository.createMeeting(payload);
    }
}
