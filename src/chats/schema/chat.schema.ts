import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  message: String,
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat-Room' },
  sentTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' },
  sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' },
}).set('timestamps', true);

export const ChatRoomSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User-Registration' }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
  isActive: { type: Boolean, default: true },
  lastMessage: String,
  lastSeen: {
    type: Date,
  },
}).set('timestamps', true);
