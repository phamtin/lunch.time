import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SigninDto, SigninSocialDto, SignupDto } from './dto/auth.dto';
import {
    SigninDtoValidation,
    SignupDtoValidation,
    SigninSocialDtoValidation,
} from './validations/auth.validation';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    @HttpCode(200)
    async signup(@Body(new SignupDtoValidation()) signupPayload: SignupDto) {
        return this.authService.signup(signupPayload);
    }

    @Post('signin')
    @HttpCode(200)
    async singin(@Body(new SigninDtoValidation()) signinPayload: SigninDto) {
        return this.authService.login(signinPayload);
    }

    @Post('signin-google')
    @HttpCode(200)
    async signinGoogle(@Body(new SigninSocialDtoValidation()) signinPayload: SigninSocialDto) {
        return this.authService.loginWithGoogle(signinPayload);
    }
}
