
import { ApiProperty } from '@nestjs/swagger';
import { MessagingPayload, NotificationMessagePayload } from 'firebase-admin/lib/messaging/messaging-api';



class FMNotificationMessagePayload implements NotificationMessagePayload {
  [key: string]: string;

  @ApiProperty()
  tag?: string;

  @ApiProperty()
  icon?: string;

  @ApiProperty()
  badge?: string;

  @ApiProperty()
  color?: string;

  @ApiProperty()
  sound?: string;

  @ApiProperty()
  bodyLocKey?: string;

  @ApiProperty()
  bodyLocArgs?: string;

  @ApiProperty()
  clickAction?: string;

  @ApiProperty()
  titleLocKey?: string;

  @ApiProperty()
  titleLocArgs?: string;
  @ApiProperty({ description: 'Title of the notification', example: 'Notification Title' })
  title: string;

  @ApiProperty({ description: 'Body of the notification', example: 'Notification Body' })
  body: string;
}

class FMMessagingPayload {
  @ApiProperty({ description: 'Data payload for the FCM message', example: { userId: 'xyz'} })
  data: any;

  // @ApiProperty({ description: 'Notification payload for the FCM message', type: FMNotificationMessagePayload })
  // notification: FMNotificationMessagePayload | NotificationMessagePayload | any;

  // @ApiProperty({
  //   description: 'Data payload for the FCM message',
  //   type: DataMessagePayload,
  //   required: false,
  // })
  // data?: DataMessagePayload;

  @ApiProperty({
    description: 'Notification payload for the FCM message',
    type: FMNotificationMessagePayload,
    required: false,
  })
  notification?: FMNotificationMessagePayload;


  @ApiProperty({
    description: 'Topic for the push notification',
    required: false,
  })
  topic?: string;

  @ApiProperty({
    description: 'Condition for the push notification',
    required: false,
  })
  condition?: string;
}

export class CreateNotificationDto {
  @ApiProperty({ description: 'Device token for the push notification', example: ['eh8G0R3lJ0_WmECPJVmPxt:APA91bF4uGbd7UL8huDAWTAgxGzKnbjPLCC0xa6uuyybZmXuv9IMHWwd3zypTJp64J6h0kitHly6A3OE6OorSi4VZN_RRGDF2rIp6Q4n2UWk5n9hhC2yEwEy74_5cnPxU72iVcBuSgM9', 'cSEn1F6HRLqbbb8sS4Cckp:APA91bHbbnwNSGPLKAzxY6fMvzD4uE1hfuWdJoRehgyW5hk8-j2Tsg6oLE3Jlnxb54iGwP457LdiuLZY0V_o9M5wo8AZbNnNo3O3LOM5xz_ePcb71qESrbvRRUezUYCWQs6JbWQXl1vY'] })
  public readonly fcmTokens: string[];

  @ApiProperty()
  public readonly userId: string;

  @ApiProperty({
    description: 'Messaging payload for the FCM message',
    type: FMMessagingPayload,
    required: false,
  })
  messagingPayload?: FMMessagingPayload | MessagingPayload;
  
}
