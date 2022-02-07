import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Users } from 'src/Domains/Users';
import { IUserRepository } from 'src/Domains/Users/IUsers.repository';
import { MAX_ROW } from 'src/utils/constants/app.constant';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(@InjectModel('Users') private readonly userModel: Model<Document>) {}

    public count(criteria: Partial<Users>) {
        if (!criteria) return this.userModel.countDocuments();
        return this.userModel.countDocuments(criteria);
    }

    public findUserByEmail(email: string) {
        return this.userModel
            .findOne({ email, deletedAt: { $eq: null } })
            .select('-__v')
            .lean();
    }

    public findUserById(id: string, options?: Partial<Users>) {
        return this.userModel
            .findOne({ _id: id, deletedAt: { $eq: null } }, options)
            .select('-password -__v')
            .lean();
    }

    public async findUsers(payload: any) {
        const { q, sort, usePage, page, limit } = payload;

        let criteria = {};
        let _page = 1;
        let _skip = 0;
        let _limit = 0;

        if (q) {
            const pattern = new RegExp(q);
            criteria = {
                $or: [
                    { email: { $regex: pattern, $options: 'i' } },
                    { username: { $regex: pattern, $options: 'i' } },
                    { givenName: { $regex: pattern, $options: 'i' } },
                    { familyName: { $regex: pattern, $options: 'i' } },
                ],
            };
        }

        let QUERY = this.userModel.find(criteria).select('-password -__v').lean();

        if (sort) QUERY.sort(sort);

        if (usePage) {
            if (+limit > 0) {
                _limit = +limit;
            } else _limit = MAX_ROW;
            if (+page > 1) _page = +page;
            if (_page > 1 && _limit > 0) _skip = (_page - 1) * _limit;

            const [data, count] = await Promise.all([
                QUERY.skip(_skip).limit(_limit),
                this.userModel.count(criteria),
            ]);
            return {
                info: {
                    page: _page,
                    length: data.length,
                    total: count,
                },
                data,
            };
        }

        return { data: await QUERY };
    }

    public createUser(user: Partial<Users>) {
        return this.userModel.create(user);
    }

    public updateUserById(id: string, modifier: Partial<Users>) {
        return this.userModel
            .findByIdAndUpdate(id, { $set: modifier }, { new: true })
            .select('-password -__v');
    }

    public updateUsers(criteria: any, modifier: Partial<Users>) {
        return this.userModel
            .updateMany(criteria, { $set: modifier }, { new: true })
            .select('-password -__v')
            .lean();
    }

    public deleteUser(id: string) {
        return this.userModel
            .findOneAndUpdate(
                { _id: id },
                { $set: { deletedAt: new Date().toISOString() } },
                { new: true },
            )
            .select('-password -__v')
            .lean();
    }

    public deleteUsers(criteria: any) {
        return this.userModel.updateMany(criteria, {
            $set: { deletedAt: new Date().toISOString() },
        });
    }
}
