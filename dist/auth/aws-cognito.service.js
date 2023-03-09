"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsCognitoService = void 0;
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
class AwsCognitoService {
    constructor() {
        this.userPool = new amazon_cognito_identity_js_1.CognitoUserPool({
            UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
            ClientId: process.env.AWS_COGNITO_CLIENT_ID
        });
    }
    async registerUser(authRegisterUserDto) {
        const { name, email, password } = authRegisterUserDto;
        return new Promise((resolve, reject) => {
            this.userPool.signUp(email, password, [
                new amazon_cognito_identity_js_1.CognitoUserAttribute({
                    Name: 'name',
                    Value: name,
                })
            ], null, (err, result) => {
                if (!result) {
                    reject(err);
                }
                else {
                    resolve(result.user);
                }
            });
        });
    }
    async authenticateUser(authLoginUserDto) {
        const { email, password } = authLoginUserDto;
        const userData = {
            Username: email,
            Pool: this.userPool
        };
        const authenticateDetails = new amazon_cognito_identity_js_1.AuthenticationDetails({
            Username: email,
            Password: password
        });
        const userCognito = new amazon_cognito_identity_js_1.CognitoUser(userData);
        return new Promise((resolve, reject) => {
            userCognito.authenticateUser(authenticateDetails, {
                onSuccess: (result) => {
                    resolve({
                        acccessToken: result.getAccessToken().getJwtToken(),
                        refreshToken: result.getRefreshToken().getToken(),
                    });
                },
                onFailure: (err) => {
                    reject(err);
                }
            });
        });
    }
    ;
    async changeUserPassword(authChangePasswordUserDto) {
        const { email, currentPassword, newPassword } = authChangePasswordUserDto;
        const userData = {
            Username: email,
            Pool: this.userPool,
        };
        const authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails({
            Username: email,
            Password: currentPassword,
        });
        const userCognito = new amazon_cognito_identity_js_1.CognitoUser(userData);
        return new Promise((resolve, reject) => {
            userCognito.authenticateUser(authenticationDetails, {
                onSuccess: () => {
                    userCognito.changePassword(currentPassword, newPassword, (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(result);
                    });
                },
                onFailure: (err) => {
                    reject(err);
                },
            });
        });
    }
    ;
    async forgotUserPassword(authForgotPasswordUserDto) {
        const { email } = authForgotPasswordUserDto;
        const userData = {
            Username: email,
            Pool: this.userPool,
        };
        const userCognito = new amazon_cognito_identity_js_1.CognitoUser(userData);
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
    }
    ;
    async confirmUserPassword(authConfirmPasswordUserDto) {
        const { email, confirmationCode, newPassword } = authConfirmPasswordUserDto;
        const userData = {
            Username: email,
            Pool: this.userPool,
        };
        const userCognito = new amazon_cognito_identity_js_1.CognitoUser(userData);
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
    }
    ;
}
exports.AwsCognitoService = AwsCognitoService;
//# sourceMappingURL=aws-cognito.service.js.map