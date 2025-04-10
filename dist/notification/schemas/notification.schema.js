"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserNotificationSchema = new mongoose_1.default.Schema({
    fcmTokens: {
        type: [String],
        require: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User-Registration',
        require: true,
        unique: true,
    },
    notification: {
        title: String,
        body: String,
        imageUrl: String,
    },
    data: Object
}).set('timestamps', true);
exports.default = UserNotificationSchema;
//# sourceMappingURL=notification.schema.js.map