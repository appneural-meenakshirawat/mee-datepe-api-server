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
exports.MeController = void 0;
const common_1 = require("@nestjs/common");
const me_service_1 = require("./me.service");
const swagger_1 = require("@nestjs/swagger");
const me_preference_dto_1 = require("./dto/me-preference.dto");
const me_decorator_1 = require("./me.decorator");
const jwt_1 = require("@nestjs/jwt");
const multer_1 = require("@nestjs/platform-express/multer");
const file_upload_utils_1 = require("./utils/file-upload.utils");
const response_dto_1 = require("../@shared/dtos/response.dto");
const messages_constant_1 = require("../@shared/constants/messages.constant");
const me_location_dto_1 = require("./dto/me-location.dto");
const errors_constant_1 = require("../@shared/constants/errors.constant");
const me_setting_dto_1 = require("./dto/me-setting.dto");
const me_account_setting_dto_1 = require("./dto/me-account-setting.dto");
const me_chat_setting_dto_1 = require("./dto/me-chat-setting.dto");
const me_profile_dto_1 = require("./dto/me-profile.dto");
const path_1 = require("path");
class UploadPhotosDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
        },
    }),
    __metadata("design:type", Array)
], UploadPhotosDto.prototype, "images", void 0);
let MeController = class MeController {
    constructor(meService, jwtService) {
        this.meService = meService;
        this.jwtService = jwtService;
    }
    async setProfile(meProfileDto, me) {
        const userPayload = this.jwtService.decode(me);
        meProfileDto.userId = userPayload.mobileNo;
        return await this.meService.setMyProfile(meProfileDto);
    }
    async setUserName(uname, me) {
        const userPayload = this.jwtService.decode(me);
        return await this.meService.setUserName(userPayload.mobileNo, uname);
    }
    async getProfile(me) {
        const userPayload = this.jwtService.decode(me);
        const data = await this.meService.getMyProfile(userPayload.mobileNo);
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async serveImage(filepath, res) {
        const imagePath = (0, path_1.join)(__dirname, '..', filepath);
        try {
            res.sendFile(imagePath);
        }
        catch (error) {
            res.status(404).send('Image not found');
        }
    }
    async setMyGender(mePreferencesDto, me) {
        const userPayload = this.jwtService.decode(me);
        mePreferencesDto.userId = userPayload.mobileNo;
        mePreferencesDto.type = 'gender';
        mePreferencesDto.regStage = 3;
        return await this.meService.setMyPreference(mePreferencesDto, true);
    }
    async getMyGender(me) {
        const userPayload = this.jwtService.decode(me);
        const data = await this.meService.getMyPreference(userPayload.mobileNo, 'gender');
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async setMyPronouns(mePreferencesDto, me) {
        const userPayload = this.jwtService.decode(me);
        mePreferencesDto.userId = userPayload.mobileNo;
        mePreferencesDto.type = 'pronoun';
        mePreferencesDto.regStage = 3;
        return await this.meService.setMyPreference(mePreferencesDto);
    }
    async getMyPronouns(me) {
        const userPayload = this.jwtService.decode(me);
        const data = await this.meService.getMyPreference(userPayload.mobileNo, 'pronoun');
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async setMySexualPreferences(mePreferencesDto, me) {
        const userPayload = this.jwtService.decode(me);
        mePreferencesDto.userId = userPayload.mobileNo;
        mePreferencesDto.type = 'sexual-preference';
        mePreferencesDto.regStage = 4;
        return await this.meService.setMyPreference(mePreferencesDto, true);
    }
    async getMySexualPreferences(me) {
        const userPayload = this.jwtService.decode(me);
        const data = await this.meService.getMyPreference(userPayload.mobileNo, 'sexual-preference');
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async setMySexualOrientation(mePreferencesDto, me) {
        const userPayload = this.jwtService.decode(me);
        mePreferencesDto.userId = userPayload.mobileNo;
        mePreferencesDto.type = 'sexual-orientation';
        mePreferencesDto.regStage = 5;
        return await this.meService.setMyPreference(mePreferencesDto);
    }
    async getMySexualOrientation(me) {
        const userPayload = this.jwtService.decode(me);
        const data = await this.meService.getMyPreference(userPayload.mobileNo, 'sexual-orientation');
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async setMyLookingFor(mePreferencesDto, me) {
        const userPayload = this.jwtService.decode(me);
        mePreferencesDto.userId = userPayload.mobileNo;
        mePreferencesDto.type = 'looking-for';
        mePreferencesDto.regStage = 6;
        return await this.meService.setMyPreference(mePreferencesDto, true);
    }
    async getMyLookingFor(me) {
        const userPayload = this.jwtService.decode(me);
        const data = await this.meService.getMyPreference(userPayload.mobileNo, 'looking-for');
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async setYouAreInto(mePreferencesDto, me) {
        const userPayload = this.jwtService.decode(me);
        mePreferencesDto.userId = userPayload.mobileNo;
        mePreferencesDto.type = 'you-are-into';
        mePreferencesDto.regStage = 6;
        return await this.meService.setMyPreference(mePreferencesDto);
    }
    async getYouAreInto(me) {
        const userPayload = this.jwtService.decode(me);
        const data = await this.meService.getMyPreference(userPayload.mobileNo, 'you-are-into', true);
        const youRInto = data.preferenceIds.map((p) => p.name);
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, youRInto);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async getMyAllPreferences(me) {
        const userPayload = this.jwtService.decode(me);
        const data = await this.meService.getMyAllPreference(userPayload.mobileNo, true);
        let allPreferences = {};
        data.forEach(ap => {
            allPreferences[ap.type] = ap.preferenceIds.map((p) => p.name);
        });
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, allPreferences);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async uploadPhoto(photos, me) {
        if (photos.length < 1) {
            throw errors_constant_1.ErrorMessage.PHOTO_MUST_BE_1;
        }
        const userPayload = this.jwtService.decode(me);
        const result = await this.meService.uploadPhoto(userPayload, photos);
        if (result) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_UPLOAD_PROFILE_PHOTO, {
                result,
            });
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.UNABLE_TO_UPLOAD_RETRY);
        }
    }
    async setCurrentLocation(meLocationDto, me) {
        const userPayload = this.jwtService.decode(me);
        meLocationDto.userId = userPayload.mobileNo;
        const location = await this.meService.setCurrentLocation(meLocationDto);
        if (location) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_SET_LOCATION);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.UNABLE_TO_SET_LOCATION);
        }
    }
    async getCurrentLocation(me) {
        const userPayload = this.jwtService.decode(me);
        const location = await this.meService.getCurrentLocation(userPayload.mobileNo);
        if (location) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, location);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND);
        }
    }
    async saveMyBio(meProfileDto, me) {
        const userPayload = this.jwtService.decode(me);
        meProfileDto.userId = userPayload.mobileNo;
        const mybio = await this.meService.setBio(meProfileDto);
        if (mybio) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, mybio);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND);
        }
    }
    async getMyBio(me) {
        const userPayload = this.jwtService.decode(me);
        const mybio = await this.meService.getBio(userPayload.mobileNo);
        if (mybio) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, mybio);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND);
        }
    }
    async saveMySettings(createSettingDto, me) {
        const userPayload = this.jwtService.decode(me);
        createSettingDto.userId = userPayload.mobileNo;
        return await this.meService.saveSettings(createSettingDto);
    }
    async saveMyUserSettings(createUserAccountSettingDto, me) {
        const userPayload = this.jwtService.decode(me);
        createUserAccountSettingDto.userId = userPayload.mobileNo;
        return await this.meService.saveSettings({
            account: createUserAccountSettingDto,
        });
    }
    async saveMyChatSettings(createUserChatSettingDto, me) {
        const userPayload = this.jwtService.decode(me);
        createUserChatSettingDto.userId = userPayload.mobileNo;
        return await this.meService.saveSettings({
            chat: createUserChatSettingDto,
        });
    }
    async changeSettings(createSettingDto, me) {
        const userPayload = this.jwtService.decode(me);
        createSettingDto.userId = userPayload.mobileNo;
        return await this.meService.changeSettings(createSettingDto);
    }
    async getSettings(me) {
        const userPayload = this.jwtService.decode(me);
        return await this.meService.getSettings(userPayload.mobileNo);
    }
    async getMyUserSettings(me) {
        const userPayload = this.jwtService.decode(me);
        const data = (await this.meService.getSettings(userPayload.mobileNo))
            .account;
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_SAVED, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_SUCCESSFULLY_SAVED, null);
        }
    }
    async getMyChatSettings(me) {
        const userPayload = this.jwtService.decode(me);
        const data = (await this.meService.getSettings(userPayload.mobileNo)).chat;
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_SAVED, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_SUCCESSFULLY_SAVED, null);
        }
    }
};
__decorate([
    (0, common_1.Post)('profile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [me_profile_dto_1.MeProfileDto, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "setProfile", null);
__decorate([
    (0, common_1.Post)('profile/:uname'),
    __param(0, (0, common_1.Param)('uname')),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "setUserName", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('images/:path'),
    __param(0, (0, common_1.Param)('path')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "serveImage", null);
__decorate([
    (0, common_1.Post)('preferences/gender'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [me_preference_dto_1.MePreferencesDto, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "setMyGender", null);
__decorate([
    (0, common_1.Get)('preferences/gender'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getMyGender", null);
__decorate([
    (0, common_1.Post)('preferences/pronouns'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [me_preference_dto_1.MePreferencesDto, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "setMyPronouns", null);
__decorate([
    (0, common_1.Get)('preferences/pronouns'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getMyPronouns", null);
__decorate([
    (0, common_1.Post)('preferences/sexual-preferences'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [me_preference_dto_1.MePreferencesDto, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "setMySexualPreferences", null);
__decorate([
    (0, common_1.Get)('preferences/sexual-preferences'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getMySexualPreferences", null);
__decorate([
    (0, common_1.Post)('preferences/sexual-orientation'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [me_preference_dto_1.MePreferencesDto, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "setMySexualOrientation", null);
__decorate([
    (0, common_1.Get)('preferences/sexual-orientation'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getMySexualOrientation", null);
__decorate([
    (0, common_1.Post)('preferences/looking-for'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [me_preference_dto_1.MePreferencesDto, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "setMyLookingFor", null);
__decorate([
    (0, common_1.Get)('preferences/looking-for'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getMyLookingFor", null);
__decorate([
    (0, common_1.Post)('preferences/you-are-into'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [me_preference_dto_1.MePreferencesDto, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "setYouAreInto", null);
__decorate([
    (0, common_1.Get)('preferences/you-are-into'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getYouAreInto", null);
__decorate([
    (0, common_1.Get)('preferences'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getMyAllPreferences", null);
__decorate([
    (0, common_1.Post)('photos'),
    (0, common_1.UseInterceptors)((0, multer_1.FilesInterceptor)('images'), file_upload_utils_1.RenameFilesInterceptor),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'List of photos to upload',
        type: UploadPhotosDto,
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Post)('current-location'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [me_location_dto_1.MeLocationDto, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "setCurrentLocation", null);
__decorate([
    (0, common_1.Get)('current-location'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getCurrentLocation", null);
__decorate([
    (0, common_1.Post)('bio'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [me_profile_dto_1.MeProfileDto, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "saveMyBio", null);
__decorate([
    (0, common_1.Get)('bio'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getMyBio", null);
__decorate([
    (0, common_1.Post)('settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [me_setting_dto_1.CreateUserSettingDto, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "saveMySettings", null);
__decorate([
    (0, common_1.Post)('settings/user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [me_account_setting_dto_1.CreateUserAccountSettingDto, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "saveMyUserSettings", null);
__decorate([
    (0, common_1.Post)('settings/chat'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [me_chat_setting_dto_1.CreateUserChatSettingDto, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "saveMyChatSettings", null);
__decorate([
    (0, common_1.Patch)('settings'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [me_setting_dto_1.CreateUserSettingDto, String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "changeSettings", null);
__decorate([
    (0, common_1.Get)('settings'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Get)('settings/user'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getMyUserSettings", null);
__decorate([
    (0, common_1.Get)('settings/chat'),
    __param(0, (0, me_decorator_1.Me)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MeController.prototype, "getMyChatSettings", null);
MeController = __decorate([
    (0, swagger_1.ApiTags)('Me APIs'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [me_service_1.MeService,
        jwt_1.JwtService])
], MeController);
exports.MeController = MeController;
//# sourceMappingURL=me.controller.js.map