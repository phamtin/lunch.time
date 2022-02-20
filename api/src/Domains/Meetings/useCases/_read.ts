import { Injectable, Inject } from '@nestjs/common';
import { Direction, RepoPayload } from 'src/utils/types/app.type';
// import { IUserRepository } from '../IUsers.repository';

const UserRepo = () => Inject('UserRepo');

@Injectable()
export class GetMeeting {
    constructor(@UserRepo() private readonly meetingRepository: any) {}

    /**
     *  [ MANAGE ]: Admin get list meetings
     *  ------------------------------------
     */
    public async GetMeetingsByAdmin(query: Record<string, string>): Promise<any> {
        const { q, sort, direction, page, limit, usePage } = query;

        let payload: RepoPayload = {};

        if (q) payload['q'] = q;

        if (sort && ['asc', 'desc'].includes(direction)) {
            payload['sort'] = { [sort]: direction as Direction };
        }

        if (usePage) {
            payload['usePage'] = true;
            payload['page'] = page;
            payload['limit'] = limit;
        }

        return this.meetingRepository.findUsers(payload);
    }

    /**
     *  [ APP ]: User get list meetings
     *  --------------------------------
     */
    public async GetMyMeetings(query: Record<string, string>): Promise<any> {
        const { q, sort, direction } = query;

        let payload: RepoPayload = {};

        if (q) payload['q'] = q;

        if (sort && ['asc', 'desc'].includes(direction)) {
            payload['sort'] = { [sort]: direction as Direction };
        }

        return this.meetingRepository.findUsers(payload);
    }
}
