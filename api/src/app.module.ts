import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Authentication/auth.module';
import { UserModule } from './Domains/Users/users.module';
import { SharedModule } from './Shared/shared.module';

@Module({
    imports: [AuthModule, UserModule, SharedModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
