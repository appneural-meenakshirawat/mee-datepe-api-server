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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNotificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class FMNotificationMessagePayload {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FMNotificationMessagePayload.prototype, "tag", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FMNotificationMessagePayload.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FMNotificationMessagePayload.prototype, "badge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FMNotificationMessagePayload.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FMNotificationMessagePayload.prototype, "sound", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FMNotificationMessagePayload.prototype, "bodyLocKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FMNotificationMessagePayload.prototype, "bodyLocArgs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FMNotificationMessagePayload.prototype, "clickAction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FMNotificationMessagePayload.prototype, "titleLocKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FMNotificationMessagePayload.prototype, "titleLocArgs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the notification', example: 'Notification Title' }),
    __metadata("design:type", String)
], FMNotificationMessagePayload.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Body of the notification', example: 'Notification Body' }),
    __metadata("design:type", String)
], FMNotificationMessagePayload.prototype, "body", void 0);
class FMMessagingPayload {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data payload for the FCM message', example: { userId: 'xyz' } }),
    __metadata("design:type", Object)
], FMMessagingPayload.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Notification payload for the FCM message',
        type: FMNotificationMessagePayload,
        required: false,
    }),
    __metadata("design:type", FMNotificationMessagePayload)
], FMMessagingPayload.prototype, "notification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Topic for the push notification',
        required: false,
    }),
    __metadata("design:type", String)
], FMMessagingPayload.prototype, "topic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Condition for the push notification',
        required: false,
    }),
    __metadata("design:type", String)
], FMMessagingPayload.prototype, "condition", void 0);
class CreateNotificationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Device token for the push notification', example: ['eh8G0R3lJ0_WmECPJVmPxt:APA91bF4uGbd7UL8huDAWTAgxGzKnbjPLCC0xa6uuyybZmXuv9IMHWwd3zypTJp64J6h0kitHly6A3OE6OorSi4VZN_RRGDF2rIp6Q4n2UWk5n9hhC2yEwEy74_5cnPxU72iVcBuSgM9', 'cSEn1F6HRLqbbb8sS4Cckp:APA91bHbbnwNSGPLKAzxY6fMvzD4uE1hfuWdJoRehgyW5hk8-j2Tsg6oLE3Jlnxb54iGwP457LdiuLZY0V_o9M5wo8AZbNnNo3O3LOM5xz_ePcb71qESrbvRRUezUYCWQs6JbWQXl1vY'] }),
    __metadata("design:type", Array)
], CreateNotificationDto.prototype, "fcmTokens", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Messaging payload for the FCM message',
        type: FMMessagingPayload,
        required: false,
    }),
    __metadata("design:type", Object)
], CreateNotificationDto.prototype, "messagingPayload", void 0);
exports.CreateNotificationDto = CreateNotificationDto;
//# sourceMappingURL=create-notification.dto.js.map