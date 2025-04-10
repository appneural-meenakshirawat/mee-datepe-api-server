import { ChatRoom } from "./../chats/interface/chatRoom.interface";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUserPreference } from "src/me/schemas/me-preferences.schema";
import { UserRegisterDto } from "src/register/dto/create-register.dto";
import { IUserRegister } from "src/register/schemas/user-registered.schema";
import { IMatchDocument } from "./schemas/user-matches.schema";
import { IWishListDocument } from "./schemas/user-wishlist.schema";
import { MeService } from "src/me/me.service";
import * as mongoose from "mongoose";
import { NotificationService } from "src/notification/notification.service";

@Injectable()
export class MatchService {
  constructor(
    @InjectModel("User-Preference")
    private readonly myPreferencesModel: Model<IUserPreference>,
    @InjectModel("User-Registration")
    private readonly userRegistrationModel: Model<IUserRegister>,
    @InjectModel("Wishlist")
    private readonly wishlistModel: Model<IWishListDocument>,
    @InjectModel("Match")
    private readonly matchModel: Model<IMatchDocument>,
    @InjectModel("Chat-Room") private readonly chatRoomModel: Model<ChatRoom>,
    private meService: MeService,
    private notificationService: NotificationService
  ) { }

  async nearbyMatches(userId: string, maxDistance: number): Promise<any> {
    const myRegData: any = await this.userRegistrationModel.findOne({
      mobileNo: userId,
    });

    return (
      await this.userRegistrationModel.find({
        isCompleted: true,
        // location: {
        //   $near: {
        //     $geometry: {
        //       type: "Point",
        //       coordinates: [
        //         parseFloat(myRegData.location.coordinates[0]),
        //         parseFloat(myRegData.location.coordinates[1]),
        //       ],
        //     },
        //     $minDistance: 0,
        //     $maxDistance: maxDistance,
        //   },
        // },
      })
    ).filter((u) => u.mobileNo !== userId);
  }

  async nearbyFind(
    userId: string,
    query: any,
    maxDistance: number
  ): Promise<any> {
    const myRegData: any = await this.userRegistrationModel.findOne({
      mobileNo: userId,
    });

    return (
      await this.userRegistrationModel.find({
        isCompleted: true,
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [
                parseFloat(myRegData.location.coordinates[0]),
                parseFloat(myRegData.location.coordinates[1]),
              ],
            },
            $minDistance: 0,
            $maxDistance: maxDistance,
          },
        },
      })
    ).filter((u) => u.mobileNo !== userId);
  }

  async nearbyFindAny(
    count: number,
    userId: string,
    query: any,
    maxDistance: number
  ): Promise<any> {
    const matchedData = (
      await this.matchModel.find(
        { firstUser: userId },
        {
          _id: 0, // Exclude the _id field if you don't need it
          secondUser: 1, // Include the userId field
        }
      )
    ).map((doc) => doc.secondUser);

    const feeds = await this.userRegistrationModel.aggregate([
      {
        // $sample: { size: count | 1 },
        $match: {
          _id: { $nin: [...matchedData, new mongoose.mongo.ObjectId(userId)] }, // Exclude documents with the specified user ID
          isCompleted: true,
          // Include documents with the specified user IDs in the array
        },
      },
      { $sample: { size: count | 1 } },
      {
        $limit: count,
      },
    ]);
    return feeds;
  }
  
  async findMatchPreferences(mobileNo: string): Promise<any> {
    const data = await this.meService.getMyAllPreference(mobileNo, true);
    let allPreferences = {};
    data.forEach((ap) => {
      allPreferences[ap.type] = ap.preferenceIds.map((p: any) => p.name);
    });
    return allPreferences;
  }
  
  async findNearbyMatchesWithPreferences(
    userId: string,
    maxDistance: number
  ): Promise<any> {
    const myRegData: any = await this.userRegistrationModel.findOne({
      mobileNo: userId,
    });

    const myPronouns: any = (
      await this.meService.getMyPreference(userId, "pronoun", true)
    )?.preferenceIds.map((p: any) => p.name);
    const mySexualPreferences: any = (
      await this.meService.getMyPreference(userId, "sexual-preference", true)
    )?.preferenceIds.map((p: any) => p.name);
    const mySexualOrientation: any = (
      await this.meService.getMyPreference(userId, "sexual-orientation", true)
    )?.preferenceIds.map((p: any) => p.name);
    const myLookingFor: any = (
      await this.meService.getMyPreference(userId, "looking-for", true)
    )?.preferenceIds.map((p: any) => p.name);

    const wishedUsers = (await this.wishlistModel.find({ firstUser: myRegData._id })).map(e => e.secondUser);

    const anyMyPrefUsers: any = (
      await this.myPreferencesModel.aggregate([
        {
          $lookup: {
            from: "preferences",
            localField: "preferenceIds",
            foreignField: "_id",
            as: "preferences",
          },
        },
        {
          $match: {
            type: "gender",
            "preferences.name": {
              $in: mySexualPreferences,
            },
          },
        },
        {
          $sample: {
            size: 1,
          },
        },
      ])
    )
      // .filter((e) => e.preferenceIds[0]["name"] == mySexualPreferences[0])
      .map((e) => e.userId)
      .filter((e) => e !== userId);

    return await this.userRegistrationModel.aggregate([
      {
        // $sample: { size: count | 1 },
        $match: {
          _id: { $nin: wishedUsers },
          mobileNo: { $in: anyMyPrefUsers },
          isCompleted: true,
          // location: {
          //   $near: {
          //     $geometry: {
          //       type: "Point",
          //       coordinates: [
          //         parseFloat(myRegData.location.coordinates[0]),
          //         parseFloat(myRegData.location.coordinates[1]),
          //       ],
          //     },
          //     $minDistance: 0,
          //     $maxDistance: maxDistance,
          //   },
          // },
        },
      },
      { $sample: { size: 1 } },
      {
        $limit: 1,
      },
    ]);
    return {};
  }



  async findNearestUnmatchedUser(userId: string, maxDistance: number): Promise<any> {
    try {
      // Fetching the user's registration data
      const myRegData = await this.userRegistrationModel.findOne({
        mobileNo: userId,
      });
  
      if (!myRegData) {
        throw new Error("User registration data not found");
      }
  
      // Fetching user preferences concurrently using Promise.all
      const [
        mySexualPreferences,
        mySexualOrientation,
        myLookingFor
      ] = await Promise.all([
        this.meService.getMyPreference(userId, "sexual-preference", true),
        this.meService.getMyPreference(userId, "sexual-orientation", true),
        this.meService.getMyPreference(userId, "looking-for", true),
      ]);
  
      // Extracting preference names from the responses
      const mySexualPreferencesNames = mySexualPreferences?.preferenceIds.map((p: any) => p.name);
      const mySexualOrientationNames = mySexualOrientation?.preferenceIds.map((p: any) => p.name);
      const myLookingForNames = myLookingFor?.preferenceIds.map((p: any) => p.name);
  
      // Fetching users that have already been matched with the current user
      const matchedUsers = await this.matchModel.find({
        $or: [{ user1: userId }, { user2: userId }],
        isActive: false, // Ensuring only inactive matches are excluded
      }).distinct('user1 user2'); // Collecting all the matched users
  
      // Finding users by preferences who haven't been matched yet
      const prefUsers = (await this.myPreferencesModel.aggregate([
        {
          $lookup: {
            from: "preferences", // The preferences collection
            localField: "preferenceIds", // Joining by preferenceIds
            foreignField: "_id", // Joining by the _id field
            as: "preferences", // Alias for joined preferences
          },
        },
        {
          $match: {
            "preferences.name": { $in: mySexualPreferencesNames }, // Matching preferences
          },
        },
        {
          $sample: { size: 1 }, // Randomly selecting a user who meets the preferences
        },
      ]))
        .map((e) => e.userId) // Extracting userIds
        .filter((e) => e !== userId && !matchedUsers.includes(e)); // Exclude the current user and already matched users
  
      // Querying nearest user who hasn't been matched yet and is within the specified distance
      const nearestUser = await this.userRegistrationModel.aggregate([
        {
          $match: {
            _id: { $nin: matchedUsers }, // Exclude already matched users
            mobileNo: { $in: prefUsers }, // Ensure the user is among those who meet the preferences
            isCompleted: true,
            // Location-based search using $near operator
            // location: {
            //   $near: {
            //     $geometry: {
            //       type: "Point", // GeoJSON format
            //       coordinates: [
            //         parseFloat(myRegData.location.coordinates[0].toString()), // Longitude
            //         parseFloat(myRegData.location.coordinates[1].toString()), // Latitude
            //       ],
            //     },
            //     $maxDistance: maxDistance, // Set the max distance for proximity search (in meters)
            //   },
            // },
          },
        },
        { $limit: 1 }, // Limit to the nearest match
      ]);
  
      // If no users are found, return a message
      if (!nearestUser.length) {
        return { message: "No nearby unmatched user found" };
      }
  
      return nearestUser;
    } catch (error) {
      console.error("Error finding nearest unmatched user:", error);
      throw new Error("Failed to find nearest unmatched user.");
    }
  }
  

  async findNearbyMatchedUser(
    userId: string,
    matchedUserId: string,
    maxDistance: number
  ): Promise<UserRegisterDto[]> {
    const myRegData: any = await this.userRegistrationModel.findOne({
      mobileNo: userId,
    });
    const users = await this.userRegistrationModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [
              myRegData.location.longitude,
              myRegData.location.latitude,
            ],
          },
          distanceField: "distance",
          maxDistance: maxDistance, // In meters
          spherical: true,
        },
      },
    ]);
    return users.find((u) => u.mobileNo === matchedUserId);
  }

  async createWish(userId: string, findUserId: string): Promise<any> {
    const newWish: any = await this.wishlistModel.findOneAndUpdate(
      { firstUser: userId, secondUser: findUserId },
      { $set: { isActive: true } },
      { upsert: true, new: true }
    );

    const checkInterest1 = await this.wishlistModel.findOne({
      firstUser: userId,
      secondUser: findUserId,
    });


    const checkInterest2 = await this.wishlistModel.findOne({
      firstUser: findUserId,
      secondUser: userId,
    });

    if (checkInterest1 && checkInterest2) {
      const newMatch1: any = await this.matchModel.findOneAndUpdate(
        { firstUser: findUserId, secondUser: userId },
        { $set: { isActive: true } },
        { upsert: true, new: true }
      );
      const newMatch2: any = await this.matchModel.findOneAndUpdate(
        { firstUser: userId, secondUser: findUserId },
        { $set: { isActive: true } },
        { upsert: true, new: true }
      );
      await this.notificationService.sendNotification({
        fcmTokens: [], userId: findUserId, messagingPayload: {
          "data": {},
          "notification": {
            "title": "Match Accepted!",
            "body": "Jane accepted your match request. Start chatting now!",
            // "image": "https://example.com/images/match_accepted.png"
          },
        }
      });
      return {
        isMatched: true,
      };
    } else {
      await this.notificationService.sendNotification({
        fcmTokens: [], userId: findUserId, messagingPayload: {
          "data": {},
          "notification": {
            "title": "New Match Request",
            "body": "John sent you a match request. Accept or decline?",
            // "image": "https://example.com/images/match_request.png"
          },
        }
      });
      return {
        isWished: true,
      };
    }
  }

  async isMatched(userId: string, findUserId: string): Promise<any> {
    const isMatched = await this.matchModel.findOne({
      $or: [
        {
          firstUser: userId,
          secondUser: findUserId,
        },
        {
          firstUser: findUserId,
          secondUser: userId,
        },
      ],
    });

    return isMatched;
  }

  async createUnMatch(userId: string, findUserId: string): Promise<any> {
    const newMatch: any = await this.matchModel.findOneAndUpdate(
      { firstUser: findUserId, secondUser: userId },
      { $set: { isActive: false } },
      { upsert: true, new: true }
    );

    await this.notificationService.sendNotification({
      fcmTokens: [], userId: findUserId, messagingPayload: {
        "data": {},
        "notification": {
          "title": "Unmatched Match Request",
          "body": "John sent you a match request. Accept or decline?",
          // "image": "https://example.com/images/match_request.png"
        },
      }
    });

    const getRoom: any = await this.chatRoomModel.findOneAndUpdate(
      {
        users: { $all: [userId, findUserId] },
      },
      { $set: { isActive: false } },
      { upsert: true, new: true }
    );
    return {
      isMatched: false,
    };
  }

  async reportUser(userId: string, findUserId: string): Promise<any> {
    const newMatch: any = await this.matchModel.findOneAndUpdate(
      { firstUser: findUserId, secondUser: userId },
      { $set: { isActive: false, isReported: true, reportedBy: userId } },
      { upsert: true, new: true }
    );
    return {
      isMatched: true,
    };
  }
}
