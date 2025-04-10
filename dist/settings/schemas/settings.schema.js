"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SettingsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    isWaiting: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});
exports.default = exports.SettingsSchema;
//# sourceMappingURL=settings.schema.js.map