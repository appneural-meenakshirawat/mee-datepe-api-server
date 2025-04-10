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
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const me_service_1 = require("../me/me.service");
const mongoose = require("mongoose");
const notification_service_1 = require("../notification/notification.service");
let MatchService = class MatchService {
    constructor(myPreferencesModel, userRegistrationModel, wishlistModel, matchModel, chatRoomModel, meService, notificationService) {
        this.myPreferencesModel = myPreferencesModel;
        this.userRegistrationModel = userRegistrationModel;
        this.wishlistModel = wishlistModel;
        this.matchModel = matchModel;
        this.chatRoomModel = chatRoomModel;
        this.meService = meService;
        this.notificationService = notificationService;
    }
    async nearbyMatches(userId, maxDistance) {
        const myRegData = await this.userRegistrationModel.findOne({
            mobileNo: userId,
        });
        return (await this.userRegistrationModel.find({
            isCompleted: true,
        })).filter((u) => u.mobileNo !== userId);
    }
    async nearbyFind(userId, query, maxDistance) {
        const myRegData = await this.userRegistrationModel.findOne({
            mobileNo: userId,
        });
        return (await this.userRegistrationModel.find({
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
        })).filter((u) => u.mobileNo !== userId);
    }
    async nearbyFindAny(count, userId, query, maxDistance) {
        const matchedData = (await this.matchModel.find({ firstUser: userId }, {
            _id: 0,
            secondUser: 1,
        })).map((doc) => doc.secondUser);
        const feeds = await this.userRegistrationModel.aggregate([
            {
                $match: {
                    _id: { $nin: [...matchedData, new mongoose.mongo.ObjectId(userId)] },
                    isCompleted: true,
                },
            },
            { $sample: { size: count | 1 } },
            {
                $limit: count,
            },
        ]);
        return feeds;
    }
    async findMatchPreferences(mobileNo) {
        const data = await this.meService.getMyAllPreference(mobileNo, true);
        let allPreferences = {};
        data.forEach((ap) => {
            allPreferences[ap.type] = ap.preferenceIds.map((p) => p.name);
        });
        return allPreferences;
    }
    async findNearbyMatchesWithPreferences(userId, maxDistance) {
        var _a, _b, _c, _d;
        const myRegData = await this.userRegistrationModel.findOne({
            mobileNo: userId,
        });
        const myPronouns = (_a = (await this.meService.getMyPreference(userId, "pronoun", true))) === null || _a === void 0 ? void 0 : _a.preferenceIds.map((p) => p.name);
        const mySexualPreferences = (_b = (await this.meService.getMyPreference(userId, "sexual-preference", true))) === null || _b === void 0 ? void 0 : _b.preferenceIds.map((p) => p.name);
        const mySexualOrientation = (_c = (await this.meService.getMyPreference(userId, "sexual-orientation", true))) === null || _c === void 0 ? void 0 : _c.preferenceIds.map((p) => p.name);
        const myLookingFor = (_d = (await this.meService.getMyPreference(userId, "looking-for", true))) === null || _d === void 0 ? void 0 : _d.preferenceIds.map((p) => p.name);
        const wishedUsers = (await this.wishlistModel.find({ firstUser: myRegData._id })).map(e => e.secondUser);
        const anyMyPrefUsers = (await this.myPreferencesModel.aggregate([
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
        ]))
            .map((e) => e.userId)
            .filter((e) => e !== userId);
        return await this.userRegistrationModel.aggregate([
            {
                $match: {
                    _id: { $nin: wishedUsers },
                    mobileNo: { $in: anyMyPrefUsers },
                    isCompleted: true,
                },
            },
            { $sample: { size: 1 } },
            {
                $limit: 1,
            },
        ]);
        return {};
    }
    async findNearestUnmatchedUser(userId, maxDistance) {
        try {
            const myRegData = await this.userRegistrationModel.findOne({
                mobileNo: userId,
            });
            if (!myRegData) {
                throw new Error("User registration data not found");
            }
            const [mySexualPreferences, mySexualOrientation, myLookingFor] = await Promise.all([
                this.meService.getMyPreference(userId, "sexual-preference", true),
                this.meService.getMyPreference(userId, "sexual-orientation", true),
                this.meService.getMyPreference(userId, "looking-for", true),
            ]);
            const mySexualPreferencesNames = mySexualPreferences === null || mySexualPreferences === void 0 ? void 0 : mySexualPreferences.preferenceIds.map((p) => p.name);
            const mySexualOrientationNames = mySexualOrientation === null || mySexualOrientation === void 0 ? void 0 : mySexualOrientation.preferenceIds.map((p) => p.name);
            const myLookingForNames = myLookingFor === null || myLookingFor === void 0 ? void 0 : myLookingFor.preferenceIds.map((p) => p.name);
            const matchedUsers = await this.matchModel.find({
                $or: [{ user1: userId }, { user2: userId }],
                isActive: false,
            }).distinct('user1 user2');
            const prefUsers = (await this.myPreferencesModel.aggregate([
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
                        "preferences.name": { $in: mySexualPreferencesNames },
                    },
                },
                {
                    $sample: { size: 1 },
                },
            ]))
                .map((e) => e.userId)
                .filter((e) => e !== userId && !matchedUsers.includes(e));
            const nearestUser = await this.userRegistrationModel.aggregate([
                {
                    $match: {
                        _id: { $nin: matchedUsers },
                        mobileNo: { $in: prefUsers },
                        isCompleted: true,
                    },
                },
                { $limit: 1 },
            ]);
            if (!nearestUser.length) {
                return { message: "No nearby unmatched user found" };
            }
            return nearestUser;
        }
        catch (error) {
            console.error("Error finding nearest unmatched user:", error);
            throw new Error("Failed to find nearest unmatched user.");
        }
    }
    async findNearbyMatchedUser(userId, matchedUserId, maxDistance) {
        const myRegData = await this.userRegistrationModel.findOne({
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
                    maxDistance: maxDistance,
                    spherical: true,
                },
            },
        ]);
        return users.find((u) => u.mobileNo === matchedUserId);
    }
    async createWish(userId, findUserId) {
        const newWish = await this.wishlistModel.findOneAndUpdate({ firstUser: userId, secondUser: findUserId }, { $set: { isActive: true } }, { upsert: true, new: true });
        const checkInterest1 = await this.wishlistModel.findOne({
            firstUser: userId,
            secondUser: findUserId,
        });
        const checkInterest2 = await this.wishlistModel.findOne({
            firstUser: findUserId,
            secondUser: userId,
        });
        if (checkInterest1 && checkInterest2) {
            const newMatch1 = await this.matchModel.findOneAndUpdate({ firstUser: findUserId, secondUser: userId }, { $set: { isActive: true } }, { upsert: true, new: true });
            const newMatch2 = await this.matchModel.findOneAndUpdate({ firstUser: userId, secondUser: findUserId }, { $set: { isActive: true } }, { upsert: true, new: true });
            await this.notificationService.sendNotification({
                fcmTokens: [], userId: findUserId, messagingPayload: {
                    "data": {},
                    "notification": {
                        "title": "Match Accepted!",
                        "body": "Jane accepted your match request. Start chatting now!",
                    },
                }
            });
            return {
                isMatched: true,
            };
        }
        else {
            await this.notificationService.sendNotification({
                fcmTokens: [], userId: findUserId, messagingPayload: {
                    "data": {},
                    "notification": {
                        "title": "New Match Request",
                        "body": "John sent you a match request. Accept or decline?",
                    },
                }
            });
            return {
                isWished: true,
            };
        }
    }
    async isMatched(userId, findUserId) {
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
    async createUnMatch(userId, findUserId) {
        const newMatch = await this.matchModel.findOneAndUpdate({ firstUser: findUserId, secondUser: userId }, { $set: { isActive: false } }, { upsert: true, new: true });
        await this.notificationService.sendNotification({
            fcmTokens: [], userId: findUserId, messagingPayload: {
                "data": {},
                "notification": {
                    "title": "Unmatched Match Request",
                    "body": "John sent you a match request. Accept or decline?",
                },
            }
        });
        const getRoom = await this.chatRoomModel.findOneAndUpdate({
            users: { $all: [userId, findUserId] },
        }, { $set: { isActive: false } }, { upsert: true, new: true });
        return {
            isMatched: false,
        };
    }
    async reportUser(userId, findUserId) {
        const newMatch = await this.matchModel.findOneAndUpdate({ firstUser: findUserId, secondUser: userId }, { $set: { isActive: false, isReported: true, reportedBy: userId } }, { upsert: true, new: true });
        return {
            isMatched: true,
        };
    }
};
MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User-Preference")),
    __param(1, (0, mongoose_1.InjectModel)("User-Registration")),
    __param(2, (0, mongoose_1.InjectModel)("Wishlist")),
    __param(3, (0, mongoose_1.InjectModel)("Match")),
    __param(4, (0, mongoose_1.InjectModel)("Chat-Room")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        me_service_1.MeService,
        notification_service_1.NotificationService])
], MatchService);
exports.MatchService = MatchService;
//# sourceMappingURL=match.service.js.map