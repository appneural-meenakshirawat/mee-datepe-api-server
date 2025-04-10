"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserPhotoSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        require: true,
        unique: true,
    },
    photo1: {
        type: String,
        require: true,
    },
    photo2: {
        type: String,
        require: true,
    },
    photo3: {
        type: String,
        require: true,
    },
    photo4: {
        type: String,
        require: true,
    },
});
exports.default = UserPhotoSchema;
//# sourceMappingURL=me-photos.schema.js.map