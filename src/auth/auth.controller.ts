import { AuthConfirmPasswordUserDto } from './DTOs/auth-confirm-password-user.dto';
import { AuthForgotPasswordUserDto } from './DTOs/auth-forgot-password-user.dto';
import { AuthChangePasswordUserDto } from './DTOs/auth-change-password-user.dto';
import { AuthLoginUserDto } from './DTOs/auth-login-user.to';
import { AuthRegisterUserDto } from './DTOs/auth-register-user.dto';
import { AwsCognitoService } from './aws-cognito.service';
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private awsCognitoService: AwsCognitoService) { }

    @Post('/register')
    async register(@Body() authRegisterUserDto: AuthRegisterUserDto) {
        return await this.awsCognitoService.registerUser(authRegisterUserDto);
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    async login(@Body() authLoginUserDto: AuthLoginUserDto) {
        return await this.awsCognitoService.authenticateUser(authLoginUserDto);
    }

    @UsePipes(ValidationPipe)
    async changePassword(
        @Body() authChangePasswordUserDto: AuthChangePasswordUserDto,
    ) {
        await this.awsCognitoService.changeUserPassword(authChangePasswordUserDto);
    }
    
    @Post('/forgot-password')
    @UsePipes(ValidationPipe)
    async forgotPassword(
        @Body() authForgotPasswordUserDto: AuthForgotPasswordUserDto,
    ) {
        return await this.awsCognitoService.forgotUserPassword(
            authForgotPasswordUserDto,
        );
    }

    @Post('/confirm-password')
    @UsePipes(ValidationPipe)
    async confirmPassword(
        @Body() authConfirmPasswordUserDto: AuthConfirmPasswordUserDto,
    ) {
        return await this.awsCognitoService.confirmUserPassword(
            authConfirmPasswordUserDto,
        );
    }
}
