"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomSchema = exports.ChatSchema = void 0;
const mongoose = require("mongoose");
exports.ChatSchema = new mongoose.Schema({
    message: String,
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat-Room' },
    sentTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' },
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' },
}).set('timestamps', true);
exports.ChatRoomSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' }],
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
    isActive: { type: Boolean, default: true },
    lastMessage: String,
    lastSeen: {
        type: Date,
    },
}).set('timestamps', true);
//# sourceMappingURL=chat.schema.js.map