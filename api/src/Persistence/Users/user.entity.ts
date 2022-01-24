import { Schema, Document } from 'mongoose';

import { Role, Social, Status } from 'src/API/Users/users.constant';

import { Users } from 'src/Domains/Users';

export const UserSchema = new Schema<Users>(
    {
        _id: { type: Schema.Types.ObjectId, required: true, auto: true },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        role: { type: String, enum: Role, default: Role.user },
        password: {
            type: String,
            min: 4,
            max: 32,
            required: function () {
                return !this.idToken;
            },
        },
        idToken: {
            type: String,
            required: function () {
                return !this.password;
            },
        },
        social: {
            type: String,
            enum: Social,
            required: function () {
                return !!this.idToken;
            },
        },
        familyName: { type: String, min: 1, max: 32 },
        givenName: { type: String, min: 1, max: 32 },
        status: { type: String, enum: Status, default: Status.active },
        phone: { type: String, max: 12, min: 9 },
        addressLine: { type: String, max: 64 },
        avatarUrl: { type: String },
        deletedAt: { type: String, default: null },
    },
    { timestamps: true },
);

export type UserDocument = Document;

// has to be an interface so you can extend
// export interface IUserEntity extends Omit<Users, '_id'> {}
