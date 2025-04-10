"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FCMTokenSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User-Registration',
        require: true,
        unique: true,
    },
    fcmToken: {
        type: String,
        require: true,
    },
}).set('timestamps', true);
exports.default = FCMTokenSchema;
//# sourceMappingURL=fcm-token.schema.js.map