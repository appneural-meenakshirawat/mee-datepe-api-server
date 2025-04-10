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
exports.RegisterController = void 0;
const common_1 = require("@nestjs/common");
const register_service_1 = require("./register.service");
const swagger_1 = require("@nestjs/swagger");
const register_mobileno_dto_1 = require("./dto/register-mobileno.dto");
const response_dto_1 = require("../@shared/dtos/response.dto");
const messages_constant_1 = require("../@shared/constants/messages.constant");
const errors_constant_1 = require("../@shared/constants/errors.constant");
const verify_otp_dto_1 = require("./dto/verify-otp.dto");
const create_register_dto_1 = require("./dto/create-register.dto");
const me_decorator_1 = require("../me/me.decorator");
const jwt_1 = require("@nestjs/jwt");
const update_register_dto_1 = require("./dto/update-register.dto");
let RegisterController = class RegisterController {
    constructor(registerService, jwtService) {
        this.registerService = registerService;
        this.jwtService = jwtService;
    }
    async registerMobileNo(registerMobileNoDto) {
        const data = await this.registerService.registerMobileNo(registerMobileNoDto);
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_SENT);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.UNABLE_TO_SEND_OTP_RETRY);
        }
    }
    async verifyOtp(verifyOtpDto) {
        const otpData = await this.registerService.verifyOtp(verifyOtpDto);
        if (otpData) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_VERIFIED, otpData);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_SUCCESSFULLY_VERIFIED, null);
        }
    }
    async getProfile(me, userId) {
        const userPayload = this.jwtService.decode(me);
        const data = await this.registerService.getMyProfile(userId);
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async registerUserData(userRegisterDto, me) {
        const userPayload = this.jwtService.decode(me);
        userRegisterDto.mobileNo = userPayload.mobileNo;
        const otpData = await this.registerService.registerUser(userRegisterDto);
        if (otpData) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_REGISTERED, otpData);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_SUCCESSFULLY_VERIFIED, null);
        }
    }
    async patchRegisterUserData(userRegisterDto, me) {
        const userPayload = this.jwtService.decode(me);
        userRegisterDto.mobileNo = userPayload.mobileNo;
        const otpData = await this.registerService.patchRegisterUser(userRegisterDto);
        if (otpData) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_REGISTERED, otpData);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_SUCCESSFULLY_VERIFIED, null);
        }
    }
    async getUserDetails(me) {
        const userPayload = this.jwtService.decode(me);
        return await this.registerService.getUserDetails(userPayload.mobileNo);
    }
    async getUserName(me) {
        const userPayload = this.jwtService.decode(me);
        return await this.registerService.getUserDetails(userPayload.mobileNo, 'name');
    }
    async getDob(me) {
        const userPayload = this.jwtService.decode(me);
        return await this.registerService.getUserDetails(userPayload.mobileNo, 'dob');
    }
    async logout(me) {
        const userPayload = this.jwtService.decode(me);
        const otpData = await this.registerService.logout(userPayload.mobileNo);
        if (otpData) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_VERIFIED, otpData);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_SUCCESSFULLY_VERIFIED, null);
        }
    }
};
__decorate([
    (0, common_1.Post)('mobileno'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_mobileno_dto_1.RegisterMobileNoDto]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "registerMobileNo", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_otp_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Get)('profile/:userId'),
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('user-data'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_register_dto_1.UserRegisterDto, String]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "registerUserData", null);
__decorate([
    (0, common_1.Patch)('user-data'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_register_dto_1.UpdateUserRegisterDto, String]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "patchRegisterUserData", null);
__decorate([
    (0, common_1.Get)('user-data'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "getUserDetails", null);
__decorate([
    (0, common_1.Get)('user-data/name'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "getUserName", null);
__decorate([
    (0, common_1.Get)('user-data/dob'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "getDob", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "logout", null);
RegisterController = __decorate([
    (0, swagger_1.ApiTags)('Register APIs'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [register_service_1.RegisterService,
        jwt_1.JwtService])
], RegisterController);
exports.RegisterController = RegisterController;
//# sourceMappingURL=register.controller.js.map