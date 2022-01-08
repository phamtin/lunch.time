import { ForbiddenException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: (requestOrigin, callback) => {
            const origins = 'http://localhost:3000';

            if (!requestOrigin || origins.includes(requestOrigin)) {
                return callback(null, requestOrigin);
            }
            return callback(new ForbiddenException('CORS !!'));
        },
        credentials: true,
    });

    await app.listen(8000);
}

bootstrap();
