import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    // Handle client connection
    const userId: any = client.handshake.query.userId;
    this.connectedClients.set(userId, client);
  }

  handleDisconnect(client: Socket) {
    // Handle client disconnection
    const userId: any = client.handshake.query.userId;
    this.connectedClients.delete(userId);
  }

  sendMessageToUser(userId: string, message: string) {
    const client = this.connectedClients.get(userId);
    if (client) {
      client.emit('message', message);
    }
  }

  @SubscribeMessage('send')
  handleMessage(
    @MessageBody()
    data: {
      senderId: string;
      receiverId: string;
      message: string;
    },
  ) {
    const { senderId, receiverId, message } = data;
    this.sendMessageToUser(receiverId, message);
  }
}
