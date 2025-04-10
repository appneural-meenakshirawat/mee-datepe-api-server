import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { SharedModule } from 'src/@shared/shared.module';
import { RegisterModule } from 'src/register/register.module';
import { MongooseModule } from '@nestjs/mongoose';
import UserNotificationSchema from './schemas/notification.schema';
import FCMTokenSchema from './schemas/fcm-token.schema';

@Module({
  imports: [
    SharedModule,
    RegisterModule,
    MongooseModule.forFeature([
      { name: 'User-FMC', schema: FCMTokenSchema },
      { name: 'User-Notification', schema: UserNotificationSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
