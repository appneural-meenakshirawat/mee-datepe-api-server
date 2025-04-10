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
exports.ChatsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const swagger_1 = require("@nestjs/swagger");
const messages_constant_1 = require("../@shared/constants/messages.constant");
const response_dto_1 = require("../@shared/dtos/response.dto");
const me_decorator_1 = require("../me/me.decorator");
const chats_service_1 = require("./chats.service");
const chat_room_dto_1 = require("./dto/chat-room.dto");
const chat_dto_1 = require("./dto/chat.dto");
const errors_constant_1 = require("../@shared/constants/errors.constant");
let ChatsController = class ChatsController {
    constructor(chatsService, jwtService) {
        this.chatsService = chatsService;
        this.jwtService = jwtService;
    }
    async createRooom(roomDto, me) {
        const userPayload = this.jwtService.decode(me);
        roomDto.meId = userPayload.userId;
        const data = await this.chatsService.createRoom(roomDto);
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_CREATED, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.UNABLE_TO_CREATE_RETRY);
        }
    }
    async getRooms(me) {
        const userPayload = this.jwtService.decode(me);
        const data = await this.chatsService.getRooms(userPayload.userId);
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND);
        }
    }
    async getRoom(me, byUsers) {
        const userPayload = this.jwtService.decode(me);
        const data = await this.chatsService.findRoom(byUsers, userPayload.userId);
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND);
        }
    }
    async getChats(roomId, me) {
        const data = await this.chatsService.getChats(roomId);
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.UNABLE_TO_CREATE_RETRY);
        }
    }
    async createChat(roomId, chatDto, me) {
        const userPayload = this.jwtService.decode(me);
        chatDto.sentBy = userPayload.userId;
        const data = await this.chatsService.createChat(roomId, chatDto);
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_CREATED, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.UNABLE_TO_CREATE_RETRY);
        }
    }
};
__decorate([
    (0, common_1.Post)('chat-list'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_room_dto_1.CreateRoomDto, String]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "createRooom", null);
__decorate([
    (0, common_1.Get)('chat-list'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getRooms", null);
__decorate([
    (0, common_1.Get)('find-room'),
    __param(0, (0, me_decorator_1.Me)()),
    __param(1, (0, common_1.Query)('byUsers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getRoom", null);
__decorate([
    (0, common_1.Get)(':roomId/chats'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "getChats", null);
__decorate([
    (0, common_1.Post)(':roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, chat_dto_1.CreateChatDto, String]),
    __metadata("design:returntype", Promise)
], ChatsController.prototype, "createChat", null);
ChatsController = __decorate([
    (0, swagger_1.ApiTags)('Chats APIs'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [chats_service_1.ChatsService,
        jwt_1.JwtService])
], ChatsController);
exports.ChatsController = ChatsController;
//# sourceMappingURL=chats.controller.js.map