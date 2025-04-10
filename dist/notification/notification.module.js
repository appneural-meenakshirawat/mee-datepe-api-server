"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
const notification_controller_1 = require("./notification.controller");
const shared_module_1 = require("../@shared/shared.module");
const register_module_1 = require("../register/register.module");
const mongoose_1 = require("@nestjs/mongoose");
const notification_schema_1 = require("./schemas/notification.schema");
const fcm_token_schema_1 = require("./schemas/fcm-token.schema");
let NotificationModule = class NotificationModule {
};
NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_module_1.SharedModule,
            register_module_1.RegisterModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'User-FMC', schema: fcm_token_schema_1.default },
                { name: 'User-Notification', schema: notification_schema_1.default },
            ]),
        ],
        controllers: [notification_controller_1.NotificationController],
        providers: [notification_service_1.NotificationService],
        exports: [notification_service_1.NotificationService],
    })
], NotificationModule);
exports.NotificationModule = NotificationModule;
//# sourceMappingURL=notification.module.js.map