import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Chat } from "./interface/chat.interface";
import { CreateChatDto } from "./dto/chat.dto";
import { CreateRoomDto } from "./dto/chat-room.dto";
import { ChatRoom } from "./interface/chatRoom.interface";
import { NotificationService } from "src/notification/notification.service";
import { ErrorMessage } from "src/@shared/constants/errors.constant";
@Injectable()
export class ChatsService {
  constructor(
    @InjectModel("Chat") private readonly chatModel: Model<Chat>,
    @InjectModel("Chat-Room") private readonly chatRoomModel: Model<ChatRoom>,
    private readonly notificationService: NotificationService
  ) {}

  async createRoom(data: CreateRoomDto): Promise<ChatRoom> {
    let getRoom: any = await this.chatRoomModel.findOne({
      users: { $all: [data.meId, data.userId] },
      // cardId: data.cardId,
    });
    if (!getRoom) {
      const createdData = await new this.chatRoomModel({
        users: [data.meId, data.userId],
      }).save();
      return new Promise((resolve) => {
        resolve(createdData);
      });
    } else {
      getRoom = await this.chatRoomModel.findOne({
        users: { $all: [data.meId, data.userId] },
      });
      return new Promise((resolve) => {
        resolve(getRoom);
      });
      throw ErrorMessage.ALREADY_EXISTS;
    }
  }

  async getRooms(cUser: string): Promise<ChatRoom[]> {
    // let query;
    // if (byUsers.includes(',')) {
    //   query = {
    //     users: {
    //       $in: [cUser.trim(), byUsers.split(',')[0].trim(), byUsers.split(',')[1].trim()],
    //     },
    //   };
    // } else if (!byUsers.includes(',')) {
    //   query = {
    //     users: {
    //       $in: [cUser.trim(), byUsers.trim()],
    //     },
    //   };
    // } else {
    //   query = {};
    // }
    const getRooms: any = await this.chatRoomModel
      .find({
        users: {
          $in: [cUser.trim()],
        },
      })
      // .populate(["users", "chats"])
      .populate(["users"])
      .sort({ updatedAt: -1 });
    return new Promise((resolve) => {
      resolve(
        getRooms.map((r) => {
          const s = { ...r._doc };
          // const user = r.users.filter((e) => e._id + "" !== cUser)[0];
          // s.name = user.firstName + " " + user.lastName;
          return s;
        })
      );
    });
  }

  async findRoom(byUser: string, cUser: string): Promise<ChatRoom[]> {
    const getRooms: any = await this.chatRoomModel
      .findOne({
        users: {
          $all: [cUser.trim(), byUser.trim()],
        },
      })
      .populate(["users", "chats"])
      .sort({ updatedAt: -1 });
    return new Promise((resolve) => {
      resolve(
        // getRooms.map((r) => {
        //   const s = { ...r._doc };
        //   const user = r.users.filter((e) => e._id + '' !== cUser)[0];
        //   // s.name = user.firstName + ' ' + user.lastName;
        //   return s;
        // }),
        getRooms
      );
    });
  }

  async getChats(roomId: string, userId?, cardId?): Promise<any> {
    const getRoomChats = await this.chatRoomModel
      .findOne({ _id: roomId })
      .populate([{ path: "chats" }]);
    return new Promise((resolve) => {
      resolve(getRoomChats);
    });
  }

  async createChat(roomId: string, data: CreateChatDto): Promise<ChatRoom> {
    // data.createdBy = userPayload.userId;
    const d: any = data;
    d.roomId = roomId;
    const createdData: any = await new this.chatModel(d).save();
    const pushData: any = { chats: createdData._id };
    const chat = await this.chatRoomModel.findByIdAndUpdate(
      { _id: roomId },
      { $push: pushData }
    );

    await this.notificationService.sendNotification({
      fcmTokens: [], userId: data.sentTo, messagingPayload: {
        "data": {},
        "notification": {
          "title": "New Message",
          "body": "You have a new message from User. Tap to read!",
          "image": "https://example.com/images/new_message.png"
        },
      }
    });
    return new Promise((resolve) => {
      resolve(chat);
    });
  }

  async findRoomById(_id): Promise<ChatRoom> {
    const data = await this.chatRoomModel.findOne({ _id });
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  async findRoomByUsers(users: [string, string]): Promise<ChatRoom> {
    const userId1 = users[0];
    const userId2 = users[1];
    const data = await this.chatRoomModel.findOne({
      users: { $in: [userId1, userId2] },
    });
    return new Promise((resolve) => {
      resolve(data);
    });
  }
}
