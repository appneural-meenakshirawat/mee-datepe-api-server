import { ChatRoomSchema } from './../chats/schema/chat.schema';
import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { SharedModule } from 'src/@shared/shared.module';
import { RegisterModule } from 'src/register/register.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferencesModule } from 'src/preferences/preferences.module';
import { MeModule } from 'src/me/me.module';
import { WishlistSchema } from './schemas/user-wishlist.schema';
import { MatchSchema } from './schemas/user-matches.schema';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    SharedModule,
    RegisterModule,
    PreferencesModule,
    MeModule,
    NotificationModule,
    MongooseModule.forFeature([
      { name: 'Wishlist', schema: WishlistSchema },
      { name: 'Match', schema: MatchSchema },
      { name: 'Chat-Room', schema: ChatRoomSchema },
    ]),
  ],
  controllers: [MatchController],
  providers: [MatchService]
})
export class MatchModule {}
