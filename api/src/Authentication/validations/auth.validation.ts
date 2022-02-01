import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import * as Joi from 'joi';
import { SigninDto, SigninSocialDto, SignupAdminDto } from '../dto/auth.dto';

@Injectable()
export class SignupDtoValidation implements PipeTransform {
    private schema: Joi.ObjectSchema;

    constructor() {
        this.schema = Joi.object<SignupAdminDto>({
            email: Joi.string().lowercase().trim().email().required(),
            password: Joi.string().trim().min(4).max(32).required(),
            username: Joi.string().trim().min(2).max(64).required(),
            familyName: Joi.string().trim().min(1).max(32).required(),
            givenName: Joi.string().trim().min(1).max(32).required(),
            phone: Joi.string().trim().min(8).max(12).allow(null),
            addressLine: Joi.string().trim().min(4).max(128).allow(null),
            avatarUrl: Joi.string().trim().max(256).allow(null),
        });
    }

    transform(value: any, metadata: ArgumentMetadata) {
        const { error, value: validatedValue } = this.schema.validate(value);

        if (error) throw new BadRequestException(error.message);

        return validatedValue;
    }
}

@Injectable()
export class SigninDtoValidation implements PipeTransform {
    private schema: Joi.ObjectSchema;

    constructor() {
        this.schema = Joi.object<SigninDto>({
            email: Joi.string().lowercase().trim().email().required(),
            password: Joi.string().trim().required(),
        });
    }

    transform(value: any, metadata: ArgumentMetadata) {
        const { error, value: validatedValue } = this.schema.validate(value);

        if (error) throw new BadRequestException(error.message);

        return validatedValue;
    }
}

@Injectable()
export class SigninSocialDtoValidation implements PipeTransform {
    private schema: Joi.ObjectSchema;

    constructor() {
        this.schema = Joi.object<SigninSocialDto>({
            email: Joi.string().lowercase().trim().email().required(),
            idToken: Joi.string().trim().required(),
            familyName: Joi.string().trim().min(1).max(32),
            givenName: Joi.string().trim().min(1).max(32),
            username: Joi.string().trim().min(2).max(64).required(),
            avatarUrl: Joi.string().trim(),
        });
    }

    transform(value: any, metadata: ArgumentMetadata) {
        const { error, value: validatedValue } = this.schema.validate(value);

        if (error) throw new BadRequestException(error.message);

        return validatedValue;
    }
}
