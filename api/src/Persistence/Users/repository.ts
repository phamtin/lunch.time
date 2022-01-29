import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import dayjs from 'dayjs';
import { Model, Document } from 'mongoose';
import { Users } from 'src/Domains/Users';
import { IUserRepository } from 'src/Domains/Users/IUsers.repository';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(@InjectModel('Users') private readonly userModel: Model<Document>) {}

    public findUserByEmail(email: string) {
        return this.userModel
            .findOne({ email, deletedAt: { $eq: null } })
            .select('-updatedAt -__v')
            .lean();
    }

    public findUserById(id: string, options?: Partial<Users>) {
        return this.userModel
            .findOne({ _id: id, deletedAt: { $eq: null } }, options)
            .select('-updatedAt -password -__v')
            .lean();
    }

    public createUser(user: Partial<Users>) {
        return this.userModel.create(user);
    }

    public updateUserById(id: string, modifier: Partial<Users>) {
        return this.userModel
            .findOneAndUpdate({ _id: id }, { $set: modifier }, { new: true })
            .select('-updatedAt -password -__v')
            .lean();
    }

    public findUsers(criteria: any, select?: Partial<Users>) {
        return this.userModel.find(criteria).select(select).lean();
    }

    public deleteUser(id: string) {
        return this.userModel
            .findOneAndUpdate(
                { _id: id },
                { $set: { deletedAt: dayjs().format() } },
                { new: true },
            )
            .select('-updatedAt -password -__v')
            .lean();
    }
}
