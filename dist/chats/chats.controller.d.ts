import { JwtService } from '@nestjs/jwt';
import { ChatsService } from './chats.service';
import { CreateRoomDto } from './dto/chat-room.dto';
import { CreateChatDto } from './dto/chat.dto';
export declare class ChatsController {
    private readonly chatsService;
    private jwtService;
    constructor(chatsService: ChatsService, jwtService: JwtService);
    createRooom(roomDto: CreateRoomDto, me: string): Promise<any>;
    getRooms(me: string): Promise<any>;
    getRoom(me: string, byUsers: string): Promise<any>;
    getChats(roomId: string, me: string): Promise<any>;
    createChat(roomId: string, chatDto: CreateChatDto, me: string): Promise<any>;
}
