import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FCMTokenDto } from './dto/set-fcm.dto';
import { ResponseError, ResponseSuccess } from 'src/@shared/dtos/response.dto';
import { Message } from 'src/@shared/constants/messages.constant';
import { ErrorMessage } from 'src/@shared/constants/errors.constant';

@ApiTags('Notification APIs')
@ApiBearerAuth()
@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async sendNotification(@Body() createNotificationDto: CreateNotificationDto) {
    const n = await this.notificationService.sendNotification(
      createNotificationDto,
    );

    if (n) {
      return new ResponseSuccess(Message.SUCCESSFULLY_SENT, n);
    } else {
      return new ResponseError(ErrorMessage.UNABLE_TO_SEND_OTP_RETRY, null);
    }
  }


  @Post('fcm')
  async setFCM(@Body() fcmTokenDto: FCMTokenDto) {
    return await this.notificationService.saveFCM(fcmTokenDto);
  }

  // @Post()
  // async sendNotification(
  //   @Body('deviceToken') deviceToken: string,
  //   @Body('title') title: string,
  //   @Body('body') body: string,
  // ): Promise<string> {
  //   return this.notificationService.sendNotification(deviceToken, title, body);
  // }

  @Get()
  async getSentNotifications(@Query('userId') userId: string ) {
    const notifications =  await this.notificationService.getSentNotifications(userId);
    if (notifications) {
      return new ResponseSuccess(Message.SUCCESSFULLY_SENT, notifications);
    } else {
      return new ResponseError(ErrorMessage.UNABLE_TO_SEND_OTP_RETRY, null);
    }
  }
}
