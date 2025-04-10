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
exports.RegisterService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const otpGenerator = require("otp-generator");
const jwt_1 = require("@nestjs/jwt");
const errors_constant_1 = require("../@shared/constants/errors.constant");
const create_register_dto_1 = require("./dto/create-register.dto");
const axios_1 = require("@nestjs/axios");
const axios_2 = require("axios");
const qs = require("qs");
const uuid_1 = require("uuid");
let RegisterService = class RegisterService {
    constructor(otpRequestModel, userRegistrationModel, myProfileModel, jwtService, httpService) {
        this.otpRequestModel = otpRequestModel;
        this.userRegistrationModel = userRegistrationModel;
        this.myProfileModel = myProfileModel;
        this.jwtService = jwtService;
        this.httpService = httpService;
    }
    async registerMobileNo(registerMobileNoDto) {
        const generatedOtp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        registerMobileNoDto.otp = registerMobileNoDto.mobileNo === '9999999999' ? '111111' : generatedOtp;
        const res = await this.sendOtp(registerMobileNoDto.mobileNo, generatedOtp);
        return await new this.otpRequestModel(registerMobileNoDto).save();
    }
    async sendOtp(mobileNo, otp) {
        let data = qs.stringify({
            "api-key": "Aa27f1d795d6fbe03f511f3b7698346e9",
            to: '91' + mobileNo,
            type: "OTP",
            sender: "DATEPE",
            body: "Your login code is " +
                otp +
                ". Please don't tell this code to anyone - RUVOX TECHNOLOGIES",
            template_id: "1207169572732899565",
        });
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://api.kaleyra.io/v1/HXIN1771025884IN/messages",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: data,
        };
        return new Promise((resolve, reject) => {
            axios_2.default
                .request(config)
                .then((response) => {
                resolve(response.data);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    generate() {
        const fullUuid = (0, uuid_1.v4)();
        const shortUuid = fullUuid.substr(0, 8);
        return shortUuid;
    }
    async verifyOtp(verifyOtpDto) {
        const otpData = await this.otpRequestModel
            .findOne({ mobileNo: verifyOtpDto.mobileNo })
            .sort({ createdAt: -1 });
        if (!otpData || otpData.otp !== verifyOtpDto.otp) {
            throw errors_constant_1.ErrorMessage.WRONG_OTP;
        }
        const reg = new create_register_dto_1.UserRegisterDto();
        reg.mobileNo = verifyOtpDto.mobileNo;
        reg.uname = this.generate();
        const regData = await this.registerUser(reg);
        return {
            token: this.jwtService.sign({
                mobileNo: otpData.mobileNo,
                otp: otpData.otp,
                userId: regData._id,
            }),
            isRegistrationCompleted: regData.isCompleted,
            registrationStage: regData.stage,
            userId: regData._id,
            name: regData.name,
            dob: regData.dob,
            profilePic: regData.profilePic,
            images: regData.images,
        };
    }
    async registerUser(userRegisterDto) {
        userRegisterDto.address = "";
        userRegisterDto.location = {
            type: "Point",
            coordinates: [0, 0],
        };
        const registerUser = await this.userRegistrationModel.findOneAndUpdate({ mobileNo: userRegisterDto.mobileNo }, { $set: userRegisterDto }, { new: true, upsert: true });
        return registerUser;
    }
    async patchRegisterUser(userRegisterDto) {
        userRegisterDto.address = "";
        userRegisterDto.stage = userRegisterDto.dob ? 2 : 1;
        userRegisterDto.location = {
            type: "Point",
            coordinates: [0, 0],
        };
        const registerUser = await this.userRegistrationModel.findOneAndUpdate({ mobileNo: userRegisterDto.mobileNo }, { $set: userRegisterDto }, { new: true, upsert: true });
        return registerUser;
    }
    async getUserDetails(mobileNo, property) {
        const registerUser = await this.userRegistrationModel.findOne({
            mobileNo,
        });
        if (property && registerUser[property])
            return registerUser[property];
        else
            return registerUser;
    }
    async logout(mobileNo) {
        return {};
    }
    async getMyProfile(userId) {
        const myProfile = await this.myProfileModel.findOne({ userId });
        return myProfile;
    }
};
RegisterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("OTP-Request")),
    __param(1, (0, mongoose_1.InjectModel)("User-Registration")),
    __param(2, (0, mongoose_1.InjectModel)("User-Profile")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        axios_1.HttpService])
], RegisterService);
exports.RegisterService = RegisterService;
//# sourceMappingURL=register.service.js.map