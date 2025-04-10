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
exports.PreferencesController = void 0;
const common_1 = require("@nestjs/common");
const preferences_service_1 = require("./preferences.service");
const create_preference_dto_1 = require("./dto/create-preference.dto");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../@shared/dtos/response.dto");
const messages_constant_1 = require("../@shared/constants/messages.constant");
const errors_constant_1 = require("../@shared/constants/errors.constant");
let PreferencesController = class PreferencesController {
    constructor(preferencesService) {
        this.preferencesService = preferencesService;
    }
    async createGender(createPreferenceDto) {
        createPreferenceDto.type = 'gender';
        return await this.preferencesService.createPreferences(createPreferenceDto);
    }
    async getGender() {
        const data = await this.preferencesService.getPreferences('gender');
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async createPronouns(createPreferenceDto) {
        createPreferenceDto.type = 'pronoun';
        return await this.preferencesService.createPreferences(createPreferenceDto);
    }
    async getPronouns() {
        const data = await this.preferencesService.getPreferences('pronoun');
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async createSexualPreferences(createPreferenceDto) {
        createPreferenceDto.type = 'sexual-preference';
        return await this.preferencesService.createPreferences(createPreferenceDto);
    }
    async getSexualPreferences() {
        const data = await this.preferencesService.getPreferences('sexual-preference');
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async createSexualOrientation(createPreferenceDto) {
        createPreferenceDto.type = 'sexual-orientation';
        return await this.preferencesService.createPreferences(createPreferenceDto);
    }
    async getSexualOrientation() {
        const data = await this.preferencesService.getPreferences('sexual-orientation');
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async createLookingFor(createPreferenceDto) {
        createPreferenceDto.type = 'looking-for';
        return await this.preferencesService.createPreferences(createPreferenceDto);
    }
    async getLookingFor() {
        const data = await this.preferencesService.getPreferences('looking-for');
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async createYouAreInto(createPreferenceDto) {
        createPreferenceDto.type = 'you-are-into';
        return await this.preferencesService.createPreferences(createPreferenceDto);
    }
    async getYouAreInto() {
        const data = await this.preferencesService.getPreferences('you-are-into');
        if (data) {
            return new response_dto_1.ResponseSuccess(messages_constant_1.Message.SUCCESSFULLY_FOUND, data);
        }
        else {
            return new response_dto_1.ResponseError(errors_constant_1.ErrorMessage.NOT_FOUND, null);
        }
    }
    async getAllPreferences() {
        return await this.preferencesService.getAllPreferences();
    }
};
__decorate([
    (0, common_1.Post)('gender'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_preference_dto_1.CreatePreferencesDto]),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "createGender", null);
__decorate([
    (0, common_1.Get)('gender'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "getGender", null);
__decorate([
    (0, common_1.Post)('pronouns'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_preference_dto_1.CreatePreferencesDto]),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "createPronouns", null);
__decorate([
    (0, common_1.Get)('pronouns'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "getPronouns", null);
__decorate([
    (0, common_1.Post)('sexual-preferences'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_preference_dto_1.CreatePreferencesDto]),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "createSexualPreferences", null);
__decorate([
    (0, common_1.Get)('sexual-preferences'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "getSexualPreferences", null);
__decorate([
    (0, common_1.Post)('sexual-orientation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_preference_dto_1.CreatePreferencesDto]),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "createSexualOrientation", null);
__decorate([
    (0, common_1.Get)('sexual-orientation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "getSexualOrientation", null);
__decorate([
    (0, common_1.Post)('looking-for'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_preference_dto_1.CreatePreferencesDto]),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "createLookingFor", null);
__decorate([
    (0, common_1.Get)('looking-for'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "getLookingFor", null);
__decorate([
    (0, common_1.Post)('you-are-into'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_preference_dto_1.CreatePreferencesDto]),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "createYouAreInto", null);
__decorate([
    (0, common_1.Get)('you-are-into'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "getYouAreInto", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "getAllPreferences", null);
PreferencesController = __decorate([
    (0, swagger_1.ApiTags)('Preferences APIs'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [preferences_service_1.PreferencesService])
], PreferencesController);
exports.PreferencesController = PreferencesController;
//# sourceMappingURL=preferences.controller.js.map