import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUserRegister } from "src/register/schemas/user-registered.schema";
import { MeLocationDto } from "./dto/me-location.dto";
import { MePhotoDto } from "./dto/me-photo.dto";
import { MePreferencesDto } from "./dto/me-preference.dto";
import { CreateUserSettingDto } from "./dto/me-setting.dto";
import { IUserPhoto } from "./schemas/me-photos.schema";
import { IUserPreference } from "./schemas/me-preferences.schema";
import { IUserSettings } from "./schemas/me-settings.schema";
import { mkdirSync, renameSync } from "fs";
import { resolve } from "path";
import { MeProfileDto } from "./dto/me-profile.dto";

@Injectable()
export class MeService {
  constructor(
    @InjectModel("User-Preference")
    private readonly myPreferencesModel: Model<IUserPreference>,
    @InjectModel("User-Profile")
    private readonly myProfileModel: Model<IUserPhoto>,
    @InjectModel("User-Registration")
    private readonly userRegistrationModel: Model<IUserRegister>,
    @InjectModel("User-Settings")
    private readonly mySettingsModel: Model<IUserSettings>
  ) {}

  async setMyPreference(mePreferencesDto: MePreferencesDto, onlyOne=false) {
    let preferences;
    if(onlyOne) {
      if(mePreferencesDto.set) {
        preferences = await this.myPreferencesModel.findOneAndUpdate(
          { userId: mePreferencesDto.userId, type: mePreferencesDto.type },
          {
            preferenceIds: [mePreferencesDto.preferenceId],
            type: mePreferencesDto.type,
          },
          { new: true, upsert: true } // Return the updated document
        );
      } else {
        preferences = await this.myPreferencesModel.findOneAndUpdate(
          { userId: mePreferencesDto.userId, type: mePreferencesDto.type },
          {
            preferenceIds: [],
            type: mePreferencesDto.type,
          },
          { new: true, upsert: true } // Return the updated document
        );
      }
      
    } else if (mePreferencesDto.set) {
      preferences = await this.myPreferencesModel.findOneAndUpdate(
        { userId: mePreferencesDto.userId, type: mePreferencesDto.type },
        {
          $addToSet: { preferenceIds: mePreferencesDto.preferenceId },
          type: mePreferencesDto.type,
        },
        { new: true, upsert: true } // Return the updated document
      );
    } else {
      preferences = await this.myPreferencesModel.findOneAndUpdate(
        { userId: mePreferencesDto.userId, type: mePreferencesDto.type },
        {
          $pull: { preferenceIds: mePreferencesDto.preferenceId },
          type: mePreferencesDto.type,
        },
        { new: true, upsert: true } // Return the updated document
      );
    }

    await this.userRegistrationModel.findOneAndUpdate(
      { mobileNo: mePreferencesDto.userId },
      { $set: { stage: mePreferencesDto.regStage } },
      {
        new: true,
        upsert: true,
      }
    );
    return preferences;
  }

  async getMyPreference(userId: string, type: string, populate?: boolean) {
    if (populate) {
      return await this.myPreferencesModel
        .findOne({ type, userId })
        .populate(["preferenceIds"]);
    } else {
      return await this.myPreferencesModel.findOne({ type, userId });
    }
  }

  async getMyAllPreference(userId: string, populate?: boolean) {
    if (populate) {
      return await this.myPreferencesModel
        .find({ userId })
        .populate(["preferenceIds"]);
    } else {
      return await this.myPreferencesModel.find({ userId });
    }
  }

  async uploadPhoto(userPayload: any, files): Promise<IUserRegister> {
    const data: any = {};
    data.mobileNo = userPayload.mobileNo;

    const images = [];

    await new Promise((resolve, reject) => {
      files.forEach((item, index) => {
        images.push(item.location);
        if (index === files.length -1) resolve(null);
      });
    })
    

    data.images = images;

    await this.userRegistrationModel.findOneAndUpdate(
      { mobileNo: userPayload.mobileNo },
      { $set: { stage: 7, profilePic: files[0].location, images } },
      {
        new: true,
        upsert: true,
      }
    );

    return await this.myProfileModel.findOneAndUpdate(
      { userId: userPayload.mobileNo },
      { $set: data },
      {
        new: true,
        upsert: true,
      }
    );
  }

  async setBio(meProfileDto: MeProfileDto) {
    return await this.myProfileModel.findOneAndUpdate(
      { userId: meProfileDto.userId },
      { $set: { bio: meProfileDto.bio } },
      {
        new: true,
        upsert: true,
      }
    );
  }

  async getBio(userId: string) {
    const myProfile: any = await this.myProfileModel.findOne({
      userId
    });
    return myProfile.bio;
  }

  async setCurrentLocation(meLocationDto: MeLocationDto) {
    const location = {
      type: "Point",
      coordinates: [meLocationDto.longitude, meLocationDto.latitude],
    };

    await this.userRegistrationModel.findOneAndUpdate(
      { mobileNo: meLocationDto.userId },
      { $set: { location, isCompleted: true, stage: 11 } },
      {
        new: true,
        upsert: true,
      }
    );
    return location;
  }

  async setUserName(userId: string, uname: string) {
    return await this.userRegistrationModel.findOneAndUpdate(
      { mobileNo: userId},
      { $set: { uname } },
      {
        new: true,
        upsert: true,
      }
    );
  }

  async getCurrentLocation(userId: string) {
    const myRegData: any = await this.userRegistrationModel.findOne({
      mobileNo: userId,
    });
    return myRegData.location;
  }

  async saveSettings(createUserSettingDto: any) {
    let mySettings: any = {};
    let userId;
    if (!createUserSettingDto?.account && !createUserSettingDto?.chat) {
      userId = createUserSettingDto.userId;
      mySettings = {
        userId: createUserSettingDto.userId,
        account: {
          phoneNumber: createUserSettingDto.userId,
          privacy: {},
          email: createUserSettingDto.email,
          Notification: createUserSettingDto.notification,
        },
        chat: {
          controlWhoMsgU: {
            readReceipt: createUserSettingDto.readReceipt,
            activityStatus: createUserSettingDto.activityStatus,
          },
        },
      };
    }

    if (createUserSettingDto?.account) {
      userId = createUserSettingDto.account.userId;

      mySettings.account = {
        phoneNumber: userId,
        privacy: {},
        email: createUserSettingDto.account.email,
        Notification: createUserSettingDto.account.notification,
      };
    }

    if (createUserSettingDto?.chat) {
      userId = createUserSettingDto.chat.userId;

      mySettings.chat = {
        controlWhoMsgU: {
          readReceipt: createUserSettingDto.chat.readReceipt,
          activityStatus: createUserSettingDto.chat.activityStatus,
        },
      };
    }
    const settings = await this.mySettingsModel.findOneAndUpdate(
      { userId },
      { $set: mySettings },
      { new: true, upsert: true }
    );
    return settings;
  }

  async changeSettings(property: any) {
    const settings = await this.mySettingsModel.findOneAndUpdate(
      {},
      { $set: { property } }
    );
    return settings;
  }

  async getSettings(userId: string) {
    const settings = await this.mySettingsModel.findOne({ userId });
    return settings;
  }

  async setMyProfile(meProfileDto: MeProfileDto) {
    const myProfile = await this.myProfileModel.findOneAndUpdate(
      { userId: meProfileDto.userId },
      { $set: meProfileDto },
      { new: true, upsert: true }
    );
    return myProfile;
  }

  async getMyProfile(userId: string) {
    const myProfile = await this.myProfileModel.findOne({ userId });
    return myProfile;
  }
}
