
export interface Chat {
  roomId: string;
  cardId: string;
  message: string;
  sentTo: string;
  sentBy: string;
  counter: string;
  amount: string;
  messagingPayload: object;
}
