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
exports.ChatsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let ChatsGateway = class ChatsGateway {
    constructor() {
        this.connectedClients = new Map();
    }
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        this.connectedClients.set(userId, client);
    }
    handleDisconnect(client) {
        const userId = client.handshake.query.userId;
        this.connectedClients.delete(userId);
    }
    sendMessageToUser(userId, message) {
        const client = this.connectedClients.get(userId);
        if (client) {
            client.emit('message', message);
        }
    }
    handleMessage(data) {
        const { senderId, receiverId, message } = data;
        this.sendMessageToUser(receiverId, message);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('send'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatsGateway.prototype, "handleMessage", null);
ChatsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], ChatsGateway);
exports.ChatsGateway = ChatsGateway;
//# sourceMappingURL=chats.gateway.js.map