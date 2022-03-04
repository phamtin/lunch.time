import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CreateUserDto } from 'src/API/Users/users.dto';

import { Users } from 'src/Domains/Users';
import { IUserRepository } from 'src/Domains/Users/IUsers.repository';
import { MAX_ROW } from 'src/utils/constants/app.constant';
import faker from '@faker-js/faker';
import { isDataView } from 'util/types';
@Injectable()
export class UserRepository implements IUserRepository {
    constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

    public count(criteria: Partial<Users>) {
        if (!criteria) return this.db.collection('users').countDocuments();

        return this.db.collection('users').countDocuments(criteria);
    }

    public async findUserByEmail(email: string) {
        const length = await this.db.collection('users').count({});
        //  gen data
        if (length === 0) {
            const gen = () => {
                return {
                    email: `${faker.name.lastName().toLowerCase()}.${faker.name
                        .firstName()
                        .toLowerCase()}@gmail.com`,
                    idToken: 'idToken',
                    social: 'google',
                    username: faker.name.firstName() + faker.name.lastName(),
                    familyName: faker.name.lastName(),
                    givenName: faker.name.firstName(),
                    role: 'user',
                    addressLine: `${faker.address.streetAddress()} ${faker.address.streetName()} - ${faker.address.cityName()} - ${faker.address.zipCode()}`,
                    phone: faker.phone.phoneNumberFormat(),
                    avatarUrl: faker.random.image(),
                    status: faker.datatype.boolean() ? 'active' : 'inactive',
                };
            };

            const us = [];
            for (let i = 0; i < 1000; i++) {
                const u = gen();
                us.push(u);
            }
            await this.db.collection('users').insertMany(us);
        }

        return this.db
            .collection('users')
            .findOne({ email, deletedAt: { $eq: null } }, { projection: { __v: 0 } });
    }

    public findUserById(id: string, options?: Partial<Users>) {
        return this.db
            .collection('users')
            .findOne(
                { _id: new ObjectId(id), deletedAt: { $eq: null } },
                { projection: { __v: 0, password: 0 } },
            );
    }

    public async findUsers(payload: any) {
        const { q, sort, usePage, page, limit, select, ...props } = payload;

        let criteria = { ...props };

        if (q) {
            const pattern = new RegExp(q);
            criteria = {
                ...criteria,
                $or: [
                    { email: { $regex: pattern, $options: 'i' } },
                    { phone: { $regex: pattern, $options: 'i' } },
                    { username: { $regex: pattern, $options: 'i' } },
                    { givenName: { $regex: pattern, $options: 'i' } },
                    { familyName: { $regex: pattern, $options: 'i' } },
                ],
            };
        }

        let QUERY = this.db.collection('users').find({});

        if (select) QUERY.project(select);

        if (sort) QUERY.sort(sort);

        if (usePage) return this.paginate(QUERY, criteria, page, limit);

        return { data: await QUERY.toArray() };
    }

    public createUser(user: CreateUserDto) {
        return this.db.collection<any>('users').insertOne(user);
    }

    public updateUserById(id: string, modifier: Partial<Users>) {
        return this.db
            .collection('users')
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: modifier },
                { returnDocument: 'after' },
            );
    }

    public updateUsers(criteria: any, modifier: Partial<Users>) {
        return this.db.collection('users').updateMany(criteria, { $set: modifier });
    }

    public deleteUser(id: string) {
        return this.db
            .collection('users')
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: { deletedAt: new Date().toISOString() } },
                { returnDocument: 'after', projection: { __v: 0, password: 0 } },
            );
    }

    public deleteUsers(criteria: any) {
        return this.db.collection('users').updateMany(criteria, {
            $set: { deletedAt: new Date().toISOString() },
        });
    }

    public async paginate(
        query: any,
        criteria: Record<string, string>,
        page: string,
        limit: string,
    ) {
        let _page = 1,
            _skip = 0,
            _limit = 0;

        if (+limit > 0) {
            _limit = +limit;
        } else _limit = MAX_ROW;
        if (+page > 1) _page = +page;
        if (_page > 1 && _limit > 0) _skip = (_page - 1) * _limit;

        const [data, count] = await Promise.all([
            query.skip(_skip).limit(_limit),
            this.db.collection('users').count(criteria),
        ]);

        return {
            info: { page: _page, length: data.length, total: count },
            data,
        };
    }
}
