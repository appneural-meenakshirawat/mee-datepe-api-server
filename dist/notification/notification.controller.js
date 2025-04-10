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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
const create_notification_dto_1 = require("./dto/create-notification.dto");
const swagger_1 = require("@nestjs/swagger");
const set_fcm_dto_1 = require("./dto/set-fcm.dto");
const response_dto_1 = require("../@shared/dtos/response.dto");
const messages_constant_1 = require("../@shared/constants/messages.constant");
const errors_constant_1 = require("../@shared/constants/errors.constant");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async sendNotification(createNotificationDto) {
        const n = await this.notificationService.sendNotification(createNotificationDto);
        if (n) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_SENT, n);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.UNABLE_TO_SEND_OTP_RETRY, null);
        }
    }
    async setFCM(fcmTokenDto) {
        return await this.notificationService.saveFCM(fcmTokenDto);
    }
    async getSentNotifications(userId) {
        const notifications = await this.notificationService.getSentNotifications(userId);
        if (notifications) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_SENT, notifications);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.UNABLE_TO_SEND_OTP_RETRY, null);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_dto_1.CreateNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "sendNotification", null);
__decorate([
    (0, common_1.Post)('fcm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_fcm_dto_1.FCMTokenDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "setFCM", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getSentNotifications", null);
NotificationController = __decorate([
    (0, swagger_1.ApiTags)('Notification APIs'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map