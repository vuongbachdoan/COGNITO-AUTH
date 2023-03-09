import { AuthConfirmPasswordUserDto } from './DTOs/auth-confirm-password-user.dto';
import { AuthForgotPasswordUserDto } from './DTOs/auth-forgot-password-user.dto';
import { AuthChangePasswordUserDto } from './DTOs/auth-change-password-user.dto';
import { AuthLoginUserDto } from './DTOs/auth-login-user.to';
import { AuthRegisterUserDto } from './DTOs/auth-register-user.dto';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js";

export class AwsCognitoService {
    private userPool: CognitoUserPool;

    constructor() {
        this.userPool = new CognitoUserPool({
            UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
            ClientId: process.env.AWS_COGNITO_CLIENT_ID
        });
    }

    async registerUser(authRegisterUserDto: AuthRegisterUserDto) {
        const { name, email, password } = authRegisterUserDto;
        return new Promise((resolve, reject) => {
            this.userPool.signUp(
                email,
                password,
                [
                    new CognitoUserAttribute({
                        Name: 'name',
                        Value: name,
                    })
                ],
                null,
                (err, result) => {
                    if (!result) {
                        reject(err);
                    } else {
                        resolve(result.user);
                    }
                }
            )
        })
    }

    async authenticateUser(authLoginUserDto: AuthLoginUserDto) {
        const { email, password } = authLoginUserDto;
        const userData = {
            Username: email,
            Pool: this.userPool
        }

        const authenticateDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        })

        const userCognito = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
            userCognito.authenticateUser(
                authenticateDetails,
                {
                    onSuccess: (result) => {
                        resolve({
                            acccessToken: result.getAccessToken().getJwtToken(),
                            refreshToken: result.getRefreshToken().getToken(),
                        })
                    },
                    onFailure: (err) => {
                        reject(err);
                    }
                },
            )
        })
    };

    async changeUserPassword(
        authChangePasswordUserDto: AuthChangePasswordUserDto,
    ) {
        const { email, currentPassword, newPassword } = authChangePasswordUserDto;

        const userData = {
            Username: email,
            Pool: this.userPool,
        };

        const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: currentPassword,
        });

        const userCognito = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
            userCognito.authenticateUser(authenticationDetails, {
                onSuccess: () => {
                    userCognito.changePassword(
                        currentPassword,
                        newPassword,
                        (err, result) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve(result);
                        },
                    );
                },
                onFailure: (err) => {
                    reject(err);
                },
            });
        });
    };

    async forgotUserPassword(
        authForgotPasswordUserDto: AuthForgotPasswordUserDto,
    ) {
        const { email } = authForgotPasswordUserDto;

        const userData = {
            Username: email,
            Pool: this.userPool,
        };

        const userCognito = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
            userCognito.forgotPassword({
                onSuccess: (result) => {
                    resolve(result);
                },
                onFailure: (err) => {
                    reject(err);
                },
            });
        });
    };

    async confirmUserPassword(
        authConfirmPasswordUserDto: AuthConfirmPasswordUserDto,
    ) {
        const { email, confirmationCode, newPassword } = authConfirmPasswordUserDto;

        const userData = {
            Username: email,
            Pool: this.userPool,
        };

        const userCognito = new CognitoUser(userData);

        return new Promise((resolve, reject) => {
            userCognito.confirmPassword(confirmationCode, newPassword, {
                onSuccess: () => {
                    resolve({ status: 'success' });
                },
                onFailure: (err) => {
                    reject(err);
                },
            });
        });
    };


}