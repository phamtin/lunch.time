import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import * as Joi from 'joi';
import { SigninDto, SigninSocialDto, SignupDto } from '../dto/auth.dto';

@Injectable()
export class SignupDtoValidation implements PipeTransform {
    private schema: Joi.ObjectSchema;

    constructor() {
        this.schema = Joi.object<SignupDto>({
            email: Joi.string().lowercase().trim().email().required(),
            password: Joi.string().trim().min(4).max(32).required(),
            username: Joi.string().trim().min(2).max(64).required(),
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
            photo: Joi.string().trim(),
        });
    }

    transform(value: any, metadata: ArgumentMetadata) {
        const { error, value: validatedValue } = this.schema.validate(value);

        if (error) throw new BadRequestException(error.message);

        return validatedValue;
    }
}
