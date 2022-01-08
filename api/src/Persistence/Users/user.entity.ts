import { Schema, Document } from 'mongoose';

import { Social, Status } from 'src/API/Users/users.constant';

import { Users } from 'src/Domains/Users';

export const UserSchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, required: true, auto: true },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
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
        status: { type: String, default: 'active', enum: Status },
        phone: { type: String, max: 12, min: 9 },
        photo: { type: String },
        addressLine: { type: String, max: 64 },
        deletedAt: { type: String, default: null },
    },
    { timestamps: true },
);

export type UserDocument = Document;

// has to be an interface so you can extend
export interface IUserEntity extends Omit<Users, '_id'> {}
