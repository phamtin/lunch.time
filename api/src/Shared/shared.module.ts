import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CryptoService } from './services/crypto.service';
import { DatabaseConnectionService } from './services/dbconnection.service';

const providers = [DatabaseConnectionService, CryptoService];


@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const dbUri = `mongodb://${configService.get('DB_HOST')}/${configService.get(
                    'DB_NAME',
                )}?readPreference=primary&appname=MongoDB`;

                return { uri: dbUri };
            },
            inject: [ConfigService],
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get('JWT_PRIVATE_KEY'),
                };
            },
            inject: [ConfigService],
        }),
        ConfigModule,
    ],
    providers,
    exports: [...providers],
})
export class SharedModule {}
