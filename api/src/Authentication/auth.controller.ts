import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SigninDto, SigninSocialDto, SignupAdminDto } from './dto/auth.dto';
import { AuthGuard } from './Guards/auth.guard';
import {
    SigninDtoValidation,
    SignupDtoValidation,
    SigninSocialDtoValidation,
} from './validations/auth.validation';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    /**
     *  [ MANAGE ]: Register a new Admin
     *  ---------------------------------
     */
    @Post('manage/admin/signup')
    @HttpCode(200)
    async signup(@Body(new SignupDtoValidation()) signupPayload: SignupAdminDto) {
        return this.authService.signup(signupPayload);
    }

    /**
     *  [ MANAGE ]: Admin login to Dashboard
     *  -------------------------------------
     */
    @Post('manage/auth/signin')
    @HttpCode(200)
    async singin(@Body(new SigninDtoValidation()) signinPayload: SigninDto) {
        return this.authService.login(signinPayload);
    }

    /**
     *  [ APP ]: User login with Google account
     *  -----------------------------------------
     */
    @Post('auth/signin-google')
    @HttpCode(200)
    async signinGoogle(@Body(new SigninSocialDtoValidation()) signinPayload: SigninSocialDto) {
        return this.authService.loginWithGoogle(signinPayload);
    }
}
