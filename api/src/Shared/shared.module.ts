import { CacheModule, Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongoClient, Db, Logger } from 'mongodb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import * as redisStore from 'cache-manager-ioredis';

import { CryptoService } from './services/crypto.service';
import { DatabaseConnectionService } from './services/dbconnection.service';
import { RedisCacheService } from './services/redisCache.service';

const RootConfiguration = ConfigModule.forRoot({
    isGlobal: true,
    validationOptions: {
        allowUnknown: true,
        abortEarly: true,
    },
});

const providers = [DatabaseConnectionService, CryptoService, RedisCacheService];

@Global()
@Module({
    imports: [
        RootConfiguration,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get('JWT_PRIVATE_KEY'),
                };
            },
            inject: [ConfigService],
        }),
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get('REDIS_HOST'),
                port: configService.get('REDIS_PORT'),
            }),
        }),
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                redis: {
                    host: configService.get('REDIS_HOST'),
                    port: Number(configService.get('REDIS_PORT')),
                    db: 1,
                },
            }),
            inject: [ConfigService],
        }),
        ConfigModule,
    ],
    providers: [
        ...providers,
        {
            provide: 'DATABASE_CONNECTION',
            useFactory: async (): Promise<Db> => {
                try {
                    Logger.setLevel('debug');
                    const dbHost = process.env.DB_HOST || 'localhost';
                    const dbPort = process.env.DB_PORT || 27017;
                    const dbName = process.env.DB_NAME || 'db-lunchtime';
                    const dbUser = process.env.DB_USER;
                    const dbUserPassword = process.env.DB_PASSWORD;

                    const uri = `mongodb://${dbUser}:${dbUserPassword}@${dbHost}:${dbPort}/${dbName}`;
                    console.log('MongoDB URI = ', uri);
                    const client = await MongoClient.connect(uri);
                    return client.db(dbName);
                } catch (e) {
                    throw e;
                }
            },
        },
    ],
    exports: [...providers, 'DATABASE_CONNECTION'],
})
export class SharedModule {}
