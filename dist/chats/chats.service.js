"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const notification_service_1 = require("../notification/notification.service");
const errors_constant_1 = require("../@shared/constants/errors.constant");
let ChatsService = class ChatsService {
    constructor(chatModel, chatRoomModel, notificationService) {
        this.chatModel = chatModel;
        this.chatRoomModel = chatRoomModel;
        this.notificationService = notificationService;
    }
    async createRoom(data) {
        let getRoom = await this.chatRoomModel.findOne({
            users: { $all: [data.meId, data.userId] },
        });
        if (!getRoom) {
            const createdData = await new this.chatRoomModel({
                users: [data.meId, data.userId],
            }).save();
            return new Promise((resolve) => {
                resolve(createdData);
            });
        }
        else {
            getRoom = await this.chatRoomModel.findOne({
                users: { $all: [data.meId, data.userId] },
            });
            return new Promise((resolve) => {
                resolve(getRoom);
            });
            throw errors_constant_1.ErrorMessage.ALREADY_EXISTS;
        }
    }
    async getRooms(cUser) {
        const getRooms = await this.chatRoomModel
            .find({
            users: {
                $in: [cUser.trim()],
            },
        })
            .populate(["users"])
            .sort({ updatedAt: -1 });
        return new Promise((resolve) => {
            resolve(getRooms.map((r) => {
                const s = Object.assign({}, r._doc);
                return s;
            }));
        });
    }
    async findRoom(byUser, cUser) {
        const getRooms = await this.chatRoomModel
            .findOne({
            users: {
                $all: [cUser.trim(), byUser.trim()],
            },
        })
            .populate(["users", "chats"])
            .sort({ updatedAt: -1 });
        return new Promise((resolve) => {
            resolve(getRooms);
        });
    }
    async getChats(roomId, userId, cardId) {
        const getRoomChats = await this.chatRoomModel
            .findOne({ _id: roomId })
            .populate([{ path: "chats" }]);
        return new Promise((resolve) => {
            resolve(getRoomChats);
        });
    }
    async createChat(roomId, data) {
        const d = data;
        d.roomId = roomId;
        const createdData = await new this.chatModel(d).save();
        const pushData = { chats: createdData._id };
        const chat = await this.chatRoomModel.findByIdAndUpdate({ _id: roomId }, { $push: pushData });
        await this.notificationService.sendNotification({
            fcmTokens: [], userId: data.sentTo, messagingPayload: {
                "data": {},
                "notification": {
                    "title": "New Message",
                    "body": "You have a new message from User. Tap to read!",
                    "image": "https://example.com/images/new_message.png"
                },
            }
        });
        return new Promise((resolve) => {
            resolve(chat);
        });
    }
    async findRoomById(_id) {
        const data = await this.chatRoomModel.findOne({ _id });
        return new Promise((resolve) => {
            resolve(data);
        });
    }
    async findRoomByUsers(users) {
        const userId1 = users[0];
        const userId2 = users[1];
        const data = await this.chatRoomModel.findOne({
            users: { $in: [userId1, userId2] },
        });
        return new Promise((resolve) => {
            resolve(data);
        });
    }
};
ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("Chat")),
    __param(1, (0, mongoose_2.InjectModel)("Chat-Room")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        notification_service_1.NotificationService])
], ChatsService);
exports.ChatsService = ChatsService;
//# sourceMappingURL=chats.service.js.map