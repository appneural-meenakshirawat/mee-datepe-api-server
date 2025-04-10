/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { RegisterMobileNoDto } from "./dto/register-mobileno.dto";
import { JwtService } from "@nestjs/jwt";
import { OtpRequest } from "./schemas/otp-request.schema";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { IUserRegister } from "./schemas/user-registered.schema";
import { UserRegisterDto } from "./dto/create-register.dto";
import { HttpService } from "@nestjs/axios";
import { IUserPhoto } from "src/me/schemas/me-photos.schema";
export declare class RegisterService {
    private otpRequestModel;
    private userRegistrationModel;
    private readonly myProfileModel;
    private jwtService;
    private httpService;
    constructor(otpRequestModel: Model<OtpRequest>, userRegistrationModel: Model<IUserRegister>, myProfileModel: Model<IUserPhoto>, jwtService: JwtService, httpService: HttpService);
    registerMobileNo(registerMobileNoDto: RegisterMobileNoDto): Promise<any>;
    sendOtp(mobileNo: any, otp: any): Promise<void>;
    generate(): string;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        token: string;
        isRegistrationCompleted: any;
        registrationStage: any;
        userId: any;
        name: any;
        dob: any;
        profilePic: any;
        images: any;
    }>;
    registerUser(userRegisterDto: UserRegisterDto): Promise<any>;
    patchRegisterUser(userRegisterDto: UserRegisterDto): Promise<any>;
    getUserDetails(mobileNo: string, property?: string): Promise<any>;
    logout(mobileNo: string): Promise<any>;
    getMyProfile(userId: string): Promise<import("mongoose").Document<unknown, {}, IUserPhoto> & IUserPhoto & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
