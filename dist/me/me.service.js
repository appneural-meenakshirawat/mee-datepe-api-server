"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MeService = class MeService {
    constructor(myPreferencesModel, myProfileModel, userRegistrationModel, mySettingsModel) {
        this.myPreferencesModel = myPreferencesModel;
        this.myProfileModel = myProfileModel;
        this.userRegistrationModel = userRegistrationModel;
        this.mySettingsModel = mySettingsModel;
    }
    async setMyPreference(mePreferencesDto, onlyOne = false) {
        let preferences;
        if (onlyOne) {
            if (mePreferencesDto.set) {
                preferences = await this.myPreferencesModel.findOneAndUpdate({ userId: mePreferencesDto.userId, type: mePreferencesDto.type }, {
                    preferenceIds: [mePreferencesDto.preferenceId],
                    type: mePreferencesDto.type,
                }, { new: true, upsert: true });
            }
            else {
                preferences = await this.myPreferencesModel.findOneAndUpdate({ userId: mePreferencesDto.userId, type: mePreferencesDto.type }, {
                    preferenceIds: [],
                    type: mePreferencesDto.type,
                }, { new: true, upsert: true });
            }
        }
        else if (mePreferencesDto.set) {
            preferences = await this.myPreferencesModel.findOneAndUpdate({ userId: mePreferencesDto.userId, type: mePreferencesDto.type }, {
                $addToSet: { preferenceIds: mePreferencesDto.preferenceId },
                type: mePreferencesDto.type,
            }, { new: true, upsert: true });
        }
        else {
            preferences = await this.myPreferencesModel.findOneAndUpdate({ userId: mePreferencesDto.userId, type: mePreferencesDto.type }, {
                $pull: { preferenceIds: mePreferencesDto.preferenceId },
                type: mePreferencesDto.type,
            }, { new: true, upsert: true });
        }
        await this.userRegistrationModel.findOneAndUpdate({ mobileNo: mePreferencesDto.userId }, { $set: { stage: mePreferencesDto.regStage } }, {
            new: true,
            upsert: true,
        });
        return preferences;
    }
    async getMyPreference(userId, type, populate) {
        if (populate) {
            return await this.myPreferencesModel
                .findOne({ type, userId })
                .populate(["preferenceIds"]);
        }
        else {
            return await this.myPreferencesModel.findOne({ type, userId });
        }
    }
    async getMyAllPreference(userId, populate) {
        if (populate) {
            return await this.myPreferencesModel
                .find({ userId })
                .populate(["preferenceIds"]);
        }
        else {
            return await this.myPreferencesModel.find({ userId });
        }
    }
    async uploadPhoto(userPayload, files) {
        const data = {};
        data.mobileNo = userPayload.mobileNo;
        const images = [];
        await new Promise((resolve, reject) => {
            files.forEach((item, index) => {
                images.push(item.location);
                if (index === files.length - 1)
                    resolve(null);
            });
        });
        data.images = images;
        await this.userRegistrationModel.findOneAndUpdate({ mobileNo: userPayload.mobileNo }, { $set: { stage: 7, profilePic: files[0].location, images } }, {
            new: true,
            upsert: true,
        });
        return await this.myProfileModel.findOneAndUpdate({ userId: userPayload.mobileNo }, { $set: data }, {
            new: true,
            upsert: true,
        });
    }
    async setBio(meProfileDto) {
        return await this.myProfileModel.findOneAndUpdate({ userId: meProfileDto.userId }, { $set: { bio: meProfileDto.bio } }, {
            new: true,
            upsert: true,
        });
    }
    async getBio(userId) {
        const myProfile = await this.myProfileModel.findOne({
            userId
        });
        return myProfile.bio;
    }
    async setCurrentLocation(meLocationDto) {
        const location = {
            type: "Point",
            coordinates: [meLocationDto.longitude, meLocationDto.latitude],
        };
        await this.userRegistrationModel.findOneAndUpdate({ mobileNo: meLocationDto.userId }, { $set: { location, isCompleted: true, stage: 11 } }, {
            new: true,
            upsert: true,
        });
        return location;
    }
    async setUserName(userId, uname) {
        return await this.userRegistrationModel.findOneAndUpdate({ mobileNo: userId }, { $set: { uname } }, {
            new: true,
            upsert: true,
        });
    }
    async getCurrentLocation(userId) {
        const myRegData = await this.userRegistrationModel.findOne({
            mobileNo: userId,
        });
        return myRegData.location;
    }
    async saveSettings(createUserSettingDto) {
        let mySettings = {};
        let userId;
        if (!(createUserSettingDto === null || createUserSettingDto === void 0 ? void 0 : createUserSettingDto.account) && !(createUserSettingDto === null || createUserSettingDto === void 0 ? void 0 : createUserSettingDto.chat)) {
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
        if (createUserSettingDto === null || createUserSettingDto === void 0 ? void 0 : createUserSettingDto.account) {
            userId = createUserSettingDto.account.userId;
            mySettings.account = {
                phoneNumber: userId,
                privacy: {},
                email: createUserSettingDto.account.email,
                Notification: createUserSettingDto.account.notification,
            };
        }
        if (createUserSettingDto === null || createUserSettingDto === void 0 ? void 0 : createUserSettingDto.chat) {
            userId = createUserSettingDto.chat.userId;
            mySettings.chat = {
                controlWhoMsgU: {
                    readReceipt: createUserSettingDto.chat.readReceipt,
                    activityStatus: createUserSettingDto.chat.activityStatus,
                },
            };
        }
        const settings = await this.mySettingsModel.findOneAndUpdate({ userId }, { $set: mySettings }, { new: true, upsert: true });
        return settings;
    }
    async changeSettings(property) {
        const settings = await this.mySettingsModel.findOneAndUpdate({}, { $set: { property } });
        return settings;
    }
    async getSettings(userId) {
        const settings = await this.mySettingsModel.findOne({ userId });
        return settings;
    }
    async setMyProfile(meProfileDto) {
        const myProfile = await this.myProfileModel.findOneAndUpdate({ userId: meProfileDto.userId }, { $set: meProfileDto }, { new: true, upsert: true });
        return myProfile;
    }
    async getMyProfile(userId) {
        const myProfile = await this.myProfileModel.findOne({ userId });
        return myProfile;
    }
};
MeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User-Preference")),
    __param(1, (0, mongoose_1.InjectModel)("User-Profile")),
    __param(2, (0, mongoose_1.InjectModel)("User-Registration")),
    __param(3, (0, mongoose_1.InjectModel)("User-Settings")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], MeService);
exports.MeService = MeService;
//# sourceMappingURL=me.service.js.map