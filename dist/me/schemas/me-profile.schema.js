"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserProfileSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        require: true,
        unique: true,
    },
    images: [String],
    interest: [String],
    bio: String,
});
exports.default = UserProfileSchema;
//# sourceMappingURL=me-profile.schema.js.map