"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeModule = void 0;
const common_1 = require("@nestjs/common");
const me_service_1 = require("./me.service");
const me_controller_1 = require("./me.controller");
const shared_module_1 = require("../@shared/shared.module");
const mongoose_1 = require("@nestjs/mongoose");
const me_preferences_schema_1 = require("./schemas/me-preferences.schema");
const me_photos_schema_1 = require("./schemas/me-photos.schema");
const register_module_1 = require("../register/register.module");
const me_settings_schema_1 = require("./schemas/me-settings.schema");
const me_profile_schema_1 = require("./schemas/me-profile.schema");
let MeModule = class MeModule {
};
MeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_module_1.SharedModule,
            register_module_1.RegisterModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'User-Preference', schema: me_preferences_schema_1.default },
                { name: 'User-Photo', schema: me_photos_schema_1.default },
                { name: 'User-Settings', schema: me_settings_schema_1.default },
                { name: 'User-Profile', schema: me_profile_schema_1.default },
            ]),
        ],
        controllers: [me_controller_1.MeController],
        providers: [me_service_1.MeService],
        exports: [mongoose_1.MongooseModule, me_service_1.MeService],
    })
], MeModule);
exports.MeModule = MeModule;
//# sourceMappingURL=me.module.js.map