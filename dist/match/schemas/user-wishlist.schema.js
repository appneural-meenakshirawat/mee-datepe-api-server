"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistSchema = void 0;
const mongoose = require("mongoose");
exports.WishlistSchema = new mongoose.Schema({
    firstUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' },
    like: Boolean,
    secondUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' },
}).set('timestamps', true);
//# sourceMappingURL=user-wishlist.schema.js.map