import { Injectable } from "@nestjs/common";
import { ServiceAccount } from "firebase-admin";
// import * as serviceAccount from './../../google-service.json';
// import { AuthService } from '../auth/auth.service';
import { InjectModel } from "@nestjs/mongoose";
import { IUserNotification } from "./schemas/notification.schema";
import { Model } from "mongoose";
import * as admin from 'firebase-admin';
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { FCMTokenDto } from "./dto/set-fcm.dto";

@Injectable()
export class NotificationService {
  private readonly messaging;

  constructor(
    @InjectModel("User-FMC")
    private readonly fmcModel: Model<IUserNotification>,
    @InjectModel("User-Notification")
    private readonly notificatioModel: Model<IUserNotification>
  ) {
    const serviceAccount = require('../../datepe-testing-firebase-adminsdk-f1grk-943fdfc444.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    this.messaging = admin.messaging();
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount as ServiceAccount),
    // });
    // admin
    //   .messaging()
    //   .send({
    //     notification: {
    //       title: 'note-Title',
    //       body: 'note-Body',
    //     },
    //     condition: "'all' in topics || 'android' in topics || 'ios' in topics",
    //   })
    //   .then((e) => {
    //   });

    // const payload = {
    //   notification: {
    //     title: 'title',
    //     body: 'body',
    //   },
    // };
    // admin
    //   .messaging()
    //   .sendToDevice(
    //     'c3E2ZYvxQB6Zdb0KKhSBoH:APA91bEhRQhDnPj_bBVOAMQLksvW7MT5Aqb4vg4WghCwxe8sW8rVMMLkxZkQDuzHMpaAieyvMEGOfBEK0b5ygWDqUzIn2ga6IgYhmS_92n6ofrErsA8Bn-Y-uakv3Eu7_OSGcHCtd2z6',
    //     payload,
    //   )
    //   .then((e) => {
    //   });
    // Promise.all([]);
    // admin
    //   .messaging()
    //   .send({
    //     notification: {
    //       title: '$FooCorp up 1.43% on the day',
    //       body: '$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.',
    //     },
    //     condition: 'condition',
    //   })
    //   .then((e) => {
    //   });
  }

  async saveFCM(fcmTokenDto: FCMTokenDto) {
    const newWish: any = await this.fmcModel.findOneAndUpdate(
      { userId: fcmTokenDto.userId },
      { $set: { fcmToken: fcmTokenDto.fcmToken } },
      { upsert: true, new: true }
    );
    return newWish;
  }

  async sendNotification(createNotificationDto: CreateNotificationDto) {
    const fcm: any = await this.fmcModel.findOne({ userId: createNotificationDto.userId }) || null;
    if(!createNotificationDto.fcmTokens && !createNotificationDto.userId) {
      return null;
    }

    const result = await admin.messaging().sendMulticast({
      tokens: (createNotificationDto?.fcmTokens
         && createNotificationDto?.fcmTokens.length > 0) ? createNotificationDto.fcmTokens: [fcm.fcmToken],
      notification: createNotificationDto.messagingPayload.notification,
      data: createNotificationDto.messagingPayload.data
    });

    await new this.notificatioModel({
      fcmTokens: createNotificationDto.fcmTokens,
      userId: fcm.userId,
      notification: createNotificationDto.messagingPayload.notification,
      data: createNotificationDto.messagingPayload.data
    }).save();

    return result;

    // return await admin.messaging().sendMulticast({
    //   tokens: ['eh8G0R3lJ0_WmECPJVmPxt:APA91bF4uGbd7UL8huDAWTAgxGzKnbjPLCC0xa6uuyybZmXuv9IMHWwd3zypTJp64J6h0kitHly6A3OE6OorSi4VZN_RRGDF2rIp6Q4n2UWk5n9hhC2yEwEy74_5cnPxU72iVcBuSgM9', 'cSEn1F6HRLqbbb8sS4Cckp:APA91bHbbnwNSGPLKAzxY6fMvzD4uE1hfuWdJoRehgyW5hk8-j2Tsg6oLE3Jlnxb54iGwP457LdiuLZY0V_o9M5wo8AZbNnNo3O3LOM5xz_ePcb71qESrbvRRUezUYCWQs6JbWQXl1vY'], // ['token_1', 'token_2', ...]
    //   notification: {
    //     title: 'Basic Notification',
    //     body: 'This is a basic notification sent from the server!',
    //     imageUrl: 'https://my-cdn.com/app-logo.png',
    //   },
    // });

    // return new Promise((resolve, reject) => {
    //   admin
    //     .messaging()
    //     .sendToDevice(['eh8G0R3lJ0_WmECPJVmPxt:APA91bF4uGbd7UL8huDAWTAgxGzKnbjPLCC0xa6uuyybZmXuv9IMHWwd3zypTJp64J6h0kitHly6A3OE6OorSi4VZN_RRGDF2rIp6Q4n2UWk5n9hhC2yEwEy74_5cnPxU72iVcBuSgM9', 'cSEn1F6HRLqbbb8sS4Cckp:APA91bHbbnwNSGPLKAzxY6fMvzD4uE1hfuWdJoRehgyW5hk8-j2Tsg6oLE3Jlnxb54iGwP457LdiuLZY0V_o9M5wo8AZbNnNo3O3LOM5xz_ePcb71qESrbvRRUezUYCWQs6JbWQXl1vY'], {
    //       data: {},
    //       notification: {
    //         title: 'Notification Title',
    //         body: 'This is the notification body'
    //       },
    //     })
    //     .then((e) => {
    //       resolve(e);
    //     });
    // });
  }

  // async sendNotification(deviceToken: string, title: string, body: string): Promise<string> {
  //   const message = {
  //     notification: {
  //       title,
  //       body,
  //     },
  //     token: deviceToken,
  //   };

  //   try {
  //     const response = await this.messaging.send(message);
  //     return 'Notification sent successfully';
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //     return 'Error sending notification';
  //   }
  // }

  async getSentNotifications(userId: string) {
    return await this.notificatioModel.find({
      userId,
    }).populate('userId').sort({ createdAt: -1 }).limit(20);
   }
}
