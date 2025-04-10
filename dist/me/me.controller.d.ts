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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { MeService } from './me.service';
import { MePreferencesDto } from './dto/me-preference.dto';
import { JwtService } from '@nestjs/jwt';
import { IUserRegister } from 'src/register/schemas/user-registered.schema';
import { IResponse } from 'src/@shared/interfaces/response.interface';
import { ResponseError, ResponseSuccess } from 'src/@shared/dtos/response.dto';
import { MeLocationDto } from './dto/me-location.dto';
import { CreateUserSettingDto } from './dto/me-setting.dto';
import { CreateUserAccountSettingDto } from './dto/me-account-setting.dto';
import { CreateUserChatSettingDto } from './dto/me-chat-setting.dto';
import { MeProfileDto } from './dto/me-profile.dto';
import { Response } from 'express';
export declare class MeController {
    private readonly meService;
    private jwtService;
    constructor(meService: MeService, jwtService: JwtService);
    setProfile(meProfileDto: MeProfileDto, me: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/me-photos.schema").IUserPhoto> & import("./schemas/me-photos.schema").IUserPhoto & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setUserName(uname: string, me: string): Promise<import("mongoose").Document<unknown, {}, IUserRegister> & IUserRegister & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getProfile(me: string): Promise<ResponseError | ResponseSuccess>;
    serveImage(filepath: string, res: Response): Promise<void>;
    setMyGender(mePreferencesDto: MePreferencesDto, me: string): Promise<any>;
    getMyGender(me: string): Promise<ResponseError | ResponseSuccess>;
    setMyPronouns(mePreferencesDto: MePreferencesDto, me: string): Promise<any>;
    getMyPronouns(me: string): Promise<ResponseError | ResponseSuccess>;
    setMySexualPreferences(mePreferencesDto: MePreferencesDto, me: string): Promise<any>;
    getMySexualPreferences(me: string): Promise<ResponseError | ResponseSuccess>;
    setMySexualOrientation(mePreferencesDto: MePreferencesDto, me: string): Promise<any>;
    getMySexualOrientation(me: string): Promise<ResponseError | ResponseSuccess>;
    setMyLookingFor(mePreferencesDto: MePreferencesDto, me: string): Promise<any>;
    getMyLookingFor(me: string): Promise<ResponseError | ResponseSuccess>;
    setYouAreInto(mePreferencesDto: MePreferencesDto, me: string): Promise<any>;
    getYouAreInto(me: string): Promise<ResponseError | ResponseSuccess>;
    getMyAllPreferences(me: string): Promise<IResponse>;
    uploadPhoto(photos: any, me: string): Promise<IResponse | IUserRegister>;
    setCurrentLocation(meLocationDto: MeLocationDto, me: string): Promise<ResponseError | ResponseSuccess>;
    getCurrentLocation(me: string): Promise<ResponseError | ResponseSuccess>;
    saveMyBio(meProfileDto: MeProfileDto, me: string): Promise<ResponseError | ResponseSuccess>;
    getMyBio(me: string): Promise<ResponseError | ResponseSuccess>;
    saveMySettings(createSettingDto: CreateUserSettingDto, me: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/me-settings.schema").IUserSettings> & import("./schemas/me-settings.schema").IUserSettings & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    saveMyUserSettings(createUserAccountSettingDto: CreateUserAccountSettingDto, me: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/me-settings.schema").IUserSettings> & import("./schemas/me-settings.schema").IUserSettings & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    saveMyChatSettings(createUserChatSettingDto: CreateUserChatSettingDto, me: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/me-settings.schema").IUserSettings> & import("./schemas/me-settings.schema").IUserSettings & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    changeSettings(createSettingDto: CreateUserSettingDto, me: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/me-settings.schema").IUserSettings> & import("./schemas/me-settings.schema").IUserSettings & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getSettings(me: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/me-settings.schema").IUserSettings> & import("./schemas/me-settings.schema").IUserSettings & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getMyUserSettings(me: string): Promise<ResponseError | ResponseSuccess>;
    getMyChatSettings(me: string): Promise<ResponseError | ResponseSuccess>;
}
