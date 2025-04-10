import { Model } from "mongoose";
import { Chat } from "./interface/chat.interface";
import { CreateChatDto } from "./dto/chat.dto";
import { CreateRoomDto } from "./dto/chat-room.dto";
import { ChatRoom } from "./interface/chatRoom.interface";
import { NotificationService } from "src/notification/notification.service";
export declare class ChatsService {
    private readonly chatModel;
    private readonly chatRoomModel;
    private readonly notificationService;
    constructor(chatModel: Model<Chat>, chatRoomModel: Model<ChatRoom>, notificationService: NotificationService);
    createRoom(data: CreateRoomDto): Promise<ChatRoom>;
    getRooms(cUser: string): Promise<ChatRoom[]>;
    findRoom(byUser: string, cUser: string): Promise<ChatRoom[]>;
    getChats(roomId: string, userId?: any, cardId?: any): Promise<any>;
    createChat(roomId: string, data: CreateChatDto): Promise<ChatRoom>;
    findRoomById(_id: any): Promise<ChatRoom>;
    findRoomByUsers(users: [string, string]): Promise<ChatRoom>;
}
