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
import { PreferencesService } from './preferences.service';
import { CreatePreferencesDto } from './dto/create-preference.dto';
import { IPreference } from './interfaces/preferences.interface';
import { ResponseError, ResponseSuccess } from 'src/@shared/dtos/response.dto';
export declare class PreferencesController {
    private readonly preferencesService;
    constructor(preferencesService: PreferencesService);
    createGender(createPreferenceDto: CreatePreferencesDto): Promise<import("mongoose").Document<unknown, {}, IPreference> & IPreference & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getGender(): Promise<ResponseError | ResponseSuccess>;
    createPronouns(createPreferenceDto: CreatePreferencesDto): Promise<import("mongoose").Document<unknown, {}, IPreference> & IPreference & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPronouns(): Promise<ResponseError | ResponseSuccess>;
    createSexualPreferences(createPreferenceDto: CreatePreferencesDto): Promise<import("mongoose").Document<unknown, {}, IPreference> & IPreference & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getSexualPreferences(): Promise<ResponseError | ResponseSuccess>;
    createSexualOrientation(createPreferenceDto: CreatePreferencesDto): Promise<import("mongoose").Document<unknown, {}, IPreference> & IPreference & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getSexualOrientation(): Promise<ResponseError | ResponseSuccess>;
    createLookingFor(createPreferenceDto: CreatePreferencesDto): Promise<import("mongoose").Document<unknown, {}, IPreference> & IPreference & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getLookingFor(): Promise<ResponseError | ResponseSuccess>;
    createYouAreInto(createPreferenceDto: CreatePreferencesDto): Promise<import("mongoose").Document<unknown, {}, IPreference> & IPreference & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getYouAreInto(): Promise<ResponseError | ResponseSuccess>;
    getAllPreferences(): Promise<IPreference[]>;
}
