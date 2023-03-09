"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_confirm_password_user_dto_1 = require("./DTOs/auth-confirm-password-user.dto");
const auth_forgot_password_user_dto_1 = require("./DTOs/auth-forgot-password-user.dto");
const auth_change_password_user_dto_1 = require("./DTOs/auth-change-password-user.dto");
const auth_login_user_to_1 = require("./DTOs/auth-login-user.to");
const auth_register_user_dto_1 = require("./DTOs/auth-register-user.dto");
const aws_cognito_service_1 = require("./aws-cognito.service");
const common_1 = require("@nestjs/common");
let AuthController = class AuthController {
    constructor(awsCognitoService) {
        this.awsCognitoService = awsCognitoService;
    }
    async register(authRegisterUserDto) {
        return await this.awsCognitoService.registerUser(authRegisterUserDto);
    }
    async login(authLoginUserDto) {
        return await this.awsCognitoService.authenticateUser(authLoginUserDto);
    }
    async changePassword(authChangePasswordUserDto) {
        await this.awsCognitoService.changeUserPassword(authChangePasswordUserDto);
    }
    async forgotPassword(authForgotPasswordUserDto) {
        return await this.awsCognitoService.forgotUserPassword(authForgotPasswordUserDto);
    }
    async confirmPassword(authConfirmPasswordUserDto) {
        return await this.awsCognitoService.confirmUserPassword(authConfirmPasswordUserDto);
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_register_user_dto_1.AuthRegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_login_user_to_1.AuthLoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_change_password_user_dto_1.AuthChangePasswordUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('/forgot-password'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_forgot_password_user_dto_1.AuthForgotPasswordUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('/confirm-password'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_confirm_password_user_dto_1.AuthConfirmPasswordUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmPassword", null);
AuthController = __decorate([
    (0, common_1.Controller)('api/v1/auth'),
    __metadata("design:paramtypes", [aws_cognito_service_1.AwsCognitoService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map