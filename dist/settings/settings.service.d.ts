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
import { Model } from 'mongoose';
import { CreateSettingDto } from './dto/create-setting.dto';
import { ISettings } from './schemas/settings.schema';
export declare class SettingsService {
    private readonly settingsModel;
    constructor(settingsModel: Model<ISettings>);
    saveSettings(createSettingDto: CreateSettingDto): Promise<import("mongoose").Document<unknown, {}, ISettings> & ISettings & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    setAppWaitingStatus(isWaiting: string): Promise<string>;
    getAppWaitingStatus(): Promise<"Activated" | "Deactivated">;
    changeSettings(property: any): Promise<import("mongoose").Document<unknown, {}, ISettings> & ISettings & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getSettings(): Promise<{
        _id: any;
        name: string;
    }[]>;
}
