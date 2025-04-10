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
import { IUserRegister } from "src/register/schemas/user-registered.schema";
import { MeLocationDto } from "./dto/me-location.dto";
import { MePreferencesDto } from "./dto/me-preference.dto";
import { IUserPhoto } from "./schemas/me-photos.schema";
import { IUserPreference } from "./schemas/me-preferences.schema";
import { IUserSettings } from "./schemas/me-settings.schema";
import { MeProfileDto } from "./dto/me-profile.dto";
export declare class MeService {
    private readonly myPreferencesModel;
    private readonly myProfileModel;
    private readonly userRegistrationModel;
    private readonly mySettingsModel;
    constructor(myPreferencesModel: Model<IUserPreference>, myProfileModel: Model<IUserPhoto>, userRegistrationModel: Model<IUserRegister>, mySettingsModel: Model<IUserSettings>);
    setMyPreference(mePreferencesDto: MePreferencesDto, onlyOne?: boolean): Promise<any>;
    getMyPreference(userId: string, type: string, populate?: boolean): Promise<import("mongoose").Document<unknown, {}, IUserPreference> & IUserPreference & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getMyAllPreference(userId: string, populate?: boolean): Promise<Omit<import("mongoose").Document<unknown, {}, IUserPreference> & IUserPreference & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    uploadPhoto(userPayload: any, files: any): Promise<IUserRegister>;
    setBio(meProfileDto: MeProfileDto): Promise<import("mongoose").Document<unknown, {}, IUserPhoto> & IUserPhoto & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getBio(userId: string): Promise<any>;
    setCurrentLocation(meLocationDto: MeLocationDto): Promise<{
        type: string;
        coordinates: number[];
    }>;
    setUserName(userId: string, uname: string): Promise<import("mongoose").Document<unknown, {}, IUserRegister> & IUserRegister & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getCurrentLocation(userId: string): Promise<any>;
    saveSettings(createUserSettingDto: any): Promise<import("mongoose").Document<unknown, {}, IUserSettings> & IUserSettings & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    changeSettings(property: any): Promise<import("mongoose").Document<unknown, {}, IUserSettings> & IUserSettings & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getSettings(userId: string): Promise<import("mongoose").Document<unknown, {}, IUserSettings> & IUserSettings & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setMyProfile(meProfileDto: MeProfileDto): Promise<import("mongoose").Document<unknown, {}, IUserPhoto> & IUserPhoto & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getMyProfile(userId: string): Promise<import("mongoose").Document<unknown, {}, IUserPhoto> & IUserPhoto & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
