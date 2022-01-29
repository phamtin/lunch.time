import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SigninDto, SigninSocialDto, SignupAdminDto } from './dto/auth.dto';
import {
    SigninDtoValidation,
    SignupDtoValidation,
    SigninSocialDtoValidation,
} from './validations/auth.validation';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('manage/admin/signup')
    @HttpCode(200)
    async signup(@Body(new SignupDtoValidation()) signupPayload: SignupAdminDto) {
        return this.authService.signup(signupPayload);
    }

    @Post('manage/auth/signin')
    @HttpCode(200)
    async singin(@Body(new SigninDtoValidation()) signinPayload: SigninDto) {
        return this.authService.login(signinPayload);
    }

    @Post('auth/signin-google')
    @HttpCode(200)
    async signinGoogle(@Body(new SigninSocialDtoValidation()) signinPayload: SigninSocialDto) {
        return this.authService.loginWithGoogle(signinPayload);
    }
}
