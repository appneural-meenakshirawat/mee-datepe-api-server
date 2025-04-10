"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterModule = void 0;
const common_1 = require("@nestjs/common");
const register_service_1 = require("./register.service");
const register_controller_1 = require("./register.controller");
const shared_module_1 = require("../@shared/shared.module");
const mongoose_1 = require("@nestjs/mongoose");
const otp_request_schema_1 = require("./schemas/otp-request.schema");
const user_registered_schema_1 = require("./schemas/user-registered.schema");
const me_profile_schema_1 = require("../me/schemas/me-profile.schema");
let RegisterModule = class RegisterModule {
};
RegisterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_module_1.SharedModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'OTP-Request', schema: otp_request_schema_1.OtpRequestSchema },
                { name: 'User-Registration', schema: user_registered_schema_1.UserRegisterSchema },
                { name: 'User-Profile', schema: me_profile_schema_1.default },
            ]),
        ],
        controllers: [register_controller_1.RegisterController],
        providers: [register_service_1.RegisterService],
        exports: [mongoose_1.MongooseModule]
    })
], RegisterModule);
exports.RegisterModule = RegisterModule;
//# sourceMappingURL=register.module.js.map