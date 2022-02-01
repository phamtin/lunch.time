import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class AdminGetUsersValidation implements PipeTransform {
    private schema: Joi.ObjectSchema;

    constructor() {
        this.schema = Joi.object({
            q: Joi.string(),
        });
    }

    transform(value: any, metadata: ArgumentMetadata) {
        const { error, value: validatedValue } = this.schema.validate(value);

        if (error) throw new BadRequestException(error.message);

        return validatedValue;
    }
}
