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
import { IUserNotification } from "./schemas/notification.schema";
import { Model } from "mongoose";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { FCMTokenDto } from "./dto/set-fcm.dto";
export declare class NotificationService {
    private readonly fmcModel;
    private readonly notificatioModel;
    private readonly messaging;
    constructor(fmcModel: Model<IUserNotification>, notificatioModel: Model<IUserNotification>);
    saveFCM(fcmTokenDto: FCMTokenDto): Promise<any>;
    sendNotification(createNotificationDto: CreateNotificationDto): Promise<import("firebase-admin/lib/messaging/messaging-api").BatchResponse>;
    getSentNotifications(userId: string): Promise<Omit<import("mongoose").Document<unknown, {}, IUserNotification> & IUserNotification & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
}
