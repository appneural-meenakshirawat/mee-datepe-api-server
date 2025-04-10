import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { FCMTokenDto } from './dto/set-fcm.dto';
import { ResponseError, ResponseSuccess } from 'src/@shared/dtos/response.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    sendNotification(createNotificationDto: CreateNotificationDto): Promise<ResponseError | ResponseSuccess>;
    setFCM(fcmTokenDto: FCMTokenDto): Promise<any>;
    getSentNotifications(userId: string): Promise<ResponseError | ResponseSuccess>;
}
