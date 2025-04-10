"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PreferencesSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});
//# sourceMappingURL=preferences.schema.js.map