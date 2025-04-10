"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserPreferenceSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        require: true,
    },
    preferenceIds: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'Preference',
        require: false,
    },
    type: {
        type: String,
        require: true,
    },
});
exports.default = UserPreferenceSchema;
//# sourceMappingURL=me-preferences.schema.js.map