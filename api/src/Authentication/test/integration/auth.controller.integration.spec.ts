import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../../app.module';
import { DatabaseConnectionService } from '../../../Shared/services/dbconnection.service';

describe('AuthController', () => {
    let dbConnection;
    let httpServer;
    let app;

    beforeAll(async() => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        const app = moduleRef.createNestApplication();
        await app.init();

        dbConnection = moduleRef.get<DatabaseConnectionService>(DatabaseConnectionService).get();
        httpServer = app.getHttpServer();
    })

    afterAll(async () => {
        await dbConnection.collection('users').deleteMany({});
        await app.close();
    })

    describe("getUsers", async () => {
        it('should return user profile', async () => {
            await dbConnection.collection('users').findAll();
            const response = await request(httpServer).get('/users/me');

            expect(response.status).toBe(200);
            // expect(response.body).toEqual([authStub()]);
        })
        
    })
})