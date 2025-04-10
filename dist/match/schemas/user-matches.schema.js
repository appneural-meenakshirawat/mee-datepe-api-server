"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchSchema = void 0;
const mongoose = require("mongoose");
exports.MatchSchema = new mongoose.Schema({
    firstUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' },
    isActive: Boolean,
    isReported: Boolean,
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' },
    secondUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' },
}).set('timestamps', true);
//# sourceMappingURL=user-matches.schema.js.map