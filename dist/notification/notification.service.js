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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const admin = require("firebase-admin");
let NotificationService = class NotificationService {
    constructor(fmcModel, notificatioModel) {
        this.fmcModel = fmcModel;
        this.notificatioModel = notificatioModel;
        const serviceAccount = require('../../datepe-testing-firebase-adminsdk-f1grk-943fdfc444.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        this.messaging = admin.messaging();
    }
    async saveFCM(fcmTokenDto) {
        const newWish = await this.fmcModel.findOneAndUpdate({ userId: fcmTokenDto.userId }, { $set: { fcmToken: fcmTokenDto.fcmToken } }, { upsert: true, new: true });
        return newWish;
    }
    async sendNotification(createNotificationDto) {
        const fcm = await this.fmcModel.findOne({ userId: createNotificationDto.userId }) || null;
        if (!createNotificationDto.fcmTokens && !createNotificationDto.userId) {
            return null;
        }
        const result = await admin.messaging().sendMulticast({
            tokens: ((createNotificationDto === null || createNotificationDto === void 0 ? void 0 : createNotificationDto.fcmTokens)
                && (createNotificationDto === null || createNotificationDto === void 0 ? void 0 : createNotificationDto.fcmTokens.length) > 0) ? createNotificationDto.fcmTokens : [fcm.fcmToken],
            notification: createNotificationDto.messagingPayload.notification,
            data: createNotificationDto.messagingPayload.data
        });
        await new this.notificatioModel({
            fcmTokens: createNotificationDto.fcmTokens,
            userId: fcm.userId,
            notification: createNotificationDto.messagingPayload.notification,
            data: createNotificationDto.messagingPayload.data
        }).save();
        return result;
    }
    async getSentNotifications(userId) {
        return await this.notificatioModel.find({
            userId,
        }).populate('userId').sort({ createdAt: -1 }).limit(20);
    }
};
NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User-FMC")),
    __param(1, (0, mongoose_1.InjectModel)("User-Notification")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map