"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserRegisterSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
    },
    uname: {
        type: String,
        trim: true,
    },
    mobileNo: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: /^\S+@\S+\.\S+$/,
    },
    dob: {
        type: String,
        trim: true,
    },
    profilePic: String,
    images: [String],
    address: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    stage: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});
exports.UserRegisterSchema.index({ location: '2dsphere' });
const User = mongoose_1.default.model('User', exports.UserRegisterSchema);
exports.default = User;
//# sourceMappingURL=user-registered.schema.js.map