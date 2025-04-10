import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private connectedClients;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    sendMessageToUser(userId: string, message: string): void;
    handleMessage(data: {
        senderId: string;
        receiverId: string;
        message: string;
    }): void;
}
