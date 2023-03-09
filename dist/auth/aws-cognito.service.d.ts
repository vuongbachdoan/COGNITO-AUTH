import { AuthConfirmPasswordUserDto } from './DTOs/auth-confirm-password-user.dto';
import { AuthForgotPasswordUserDto } from './DTOs/auth-forgot-password-user.dto';
import { AuthChangePasswordUserDto } from './DTOs/auth-change-password-user.dto';
import { AuthLoginUserDto } from './DTOs/auth-login-user.to';
import { AuthRegisterUserDto } from './DTOs/auth-register-user.dto';
export declare class AwsCognitoService {
    private userPool;
    constructor();
    registerUser(authRegisterUserDto: AuthRegisterUserDto): Promise<unknown>;
    authenticateUser(authLoginUserDto: AuthLoginUserDto): Promise<unknown>;
    changeUserPassword(authChangePasswordUserDto: AuthChangePasswordUserDto): Promise<unknown>;
    forgotUserPassword(authForgotPasswordUserDto: AuthForgotPasswordUserDto): Promise<unknown>;
    confirmUserPassword(authConfirmPasswordUserDto: AuthConfirmPasswordUserDto): Promise<unknown>;
}
