import { Module } from '@nestjs/common';
import { UserModule } from 'src/Domains/Users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
