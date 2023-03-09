import { AuthConfirmPasswordUserDto } from './DTOs/auth-confirm-password-user.dto';
import { AuthForgotPasswordUserDto } from './DTOs/auth-forgot-password-user.dto';
import { AuthChangePasswordUserDto } from './DTOs/auth-change-password-user.dto';
import { AuthLoginUserDto } from './DTOs/auth-login-user.to';
import { AuthRegisterUserDto } from './DTOs/auth-register-user.dto';
import { AwsCognitoService } from './aws-cognito.service';
export declare class AuthController {
    private awsCognitoService;
    constructor(awsCognitoService: AwsCognitoService);
    register(authRegisterUserDto: AuthRegisterUserDto): Promise<unknown>;
    login(authLoginUserDto: AuthLoginUserDto): Promise<unknown>;
    changePassword(authChangePasswordUserDto: AuthChangePasswordUserDto): Promise<void>;
    forgotPassword(authForgotPasswordUserDto: AuthForgotPasswordUserDto): Promise<unknown>;
    confirmPassword(authConfirmPasswordUserDto: AuthConfirmPasswordUserDto): Promise<unknown>;
}
