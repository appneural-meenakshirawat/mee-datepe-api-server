"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSettingsSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        require: true,
        unique: true,
    },
    account: {
        phoneNumber: String,
        privacy: {},
        email: String,
        Notification: Boolean,
    },
    chat: {
        controlWhoMsgU: {
            readReceipt: Boolean,
            activityStatus: Boolean,
        },
    },
});
exports.default = UserSettingsSchema;
//# sourceMappingURL=me-settings.schema.js.map