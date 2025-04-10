import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { SharedModule } from 'src/@shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoomSchema, ChatSchema } from './schema/chat.schema';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    SharedModule,
    NotificationModule,
    MongooseModule.forFeature([
      { name: 'Chat', schema: ChatSchema },
      { name: 'Chat-Room', schema: ChatRoomSchema },
    ]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService, ChatsGateway],
})
export class ChatsModule {}
