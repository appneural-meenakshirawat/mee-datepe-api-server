"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchModule = void 0;
const chat_schema_1 = require("./../chats/schema/chat.schema");
const common_1 = require("@nestjs/common");
const match_service_1 = require("./match.service");
const match_controller_1 = require("./match.controller");
const shared_module_1 = require("../@shared/shared.module");
const register_module_1 = require("../register/register.module");
const mongoose_1 = require("@nestjs/mongoose");
const preferences_module_1 = require("../preferences/preferences.module");
const me_module_1 = require("../me/me.module");
const user_wishlist_schema_1 = require("./schemas/user-wishlist.schema");
const user_matches_schema_1 = require("./schemas/user-matches.schema");
const notification_module_1 = require("../notification/notification.module");
let MatchModule = class MatchModule {
};
MatchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_module_1.SharedModule,
            register_module_1.RegisterModule,
            preferences_module_1.PreferencesModule,
            me_module_1.MeModule,
            notification_module_1.NotificationModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'Wishlist', schema: user_wishlist_schema_1.WishlistSchema },
                { name: 'Match', schema: user_matches_schema_1.MatchSchema },
                { name: 'Chat-Room', schema: chat_schema_1.ChatRoomSchema },
            ]),
        ],
        controllers: [match_controller_1.MatchController],
        providers: [match_service_1.MatchService]
    })
], MatchModule);
exports.MatchModule = MatchModule;
//# sourceMappingURL=match.module.js.map