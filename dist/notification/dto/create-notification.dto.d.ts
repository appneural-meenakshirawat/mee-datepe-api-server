import { MessagingPayload, NotificationMessagePayload } from 'firebase-admin/lib/messaging/messaging-api';
declare class FMNotificationMessagePayload implements NotificationMessagePayload {
    [key: string]: string;
    tag?: string;
    icon?: string;
    badge?: string;
    color?: string;
    sound?: string;
    bodyLocKey?: string;
    bodyLocArgs?: string;
    clickAction?: string;
    titleLocKey?: string;
    titleLocArgs?: string;
    title: string;
    body: string;
}
declare class FMMessagingPayload {
    data: any;
    notification?: FMNotificationMessagePayload;
    topic?: string;
    condition?: string;
}
export declare class CreateNotificationDto {
    readonly fcmTokens: string[];
    readonly userId: string;
    messagingPayload?: FMMessagingPayload | MessagingPayload;
}
export {};
