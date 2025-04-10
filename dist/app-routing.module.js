"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const register_module_1 = require("./register/register.module");
const preferences_module_1 = require("./preferences/preferences.module");
const me_module_1 = require("./me/me.module");
const match_module_1 = require("./match/match.module");
const notification_module_1 = require("./notification/notification.module");
const settings_module_1 = require("./settings/settings.module");
const chats_module_1 = require("./chats/chats.module");
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: 'register',
                    module: register_module_1.RegisterModule,
                },
                {
                    path: 'preference',
                    module: preferences_module_1.PreferencesModule,
                },
                {
                    path: 'me',
                    module: me_module_1.MeModule,
                },
                {
                    path: 'match',
                    module: match_module_1.MatchModule,
                },
                {
                    path: 'chats',
                    module: chats_module_1.ChatsModule,
                },
                {
                    path: 'settings',
                    module: settings_module_1.SettingsModule,
                },
                {
                    path: 'notifications',
                    module: notification_module_1.NotificationModule,
                },
            ]),
            register_module_1.RegisterModule,
            preferences_module_1.PreferencesModule,
            me_module_1.MeModule,
            match_module_1.MatchModule,
            notification_module_1.NotificationModule,
            settings_module_1.SettingsModule,
            chats_module_1.ChatsModule,
        ],
        exports: [core_1.RouterModule],
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map