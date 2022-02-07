import { ForbiddenException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

let app;
async function bootstrap() {
    console.log('=============================================\n');
    console.log('== Lunchtime API initialized successfully...\n');
    console.log('=============================================');

    app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: (requestOrigin, callback) => {
            const origins = [
                'http://localhost:3000',
                'https://frontend-phamtin.cloud.okteto.net',
            ];

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

export { app };
