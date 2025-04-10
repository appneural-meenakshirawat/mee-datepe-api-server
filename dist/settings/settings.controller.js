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
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const settings_service_1 = require("./settings.service");
const create_setting_dto_1 = require("./dto/create-setting.dto");
const swagger_1 = require("@nestjs/swagger");
let SettingsController = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async createPronouns(createSettingDto) {
        return await this.settingsService.saveSettings(createSettingDto);
    }
    async setAppWaitingStatus(isWaiting) {
        return await this.settingsService.setAppWaitingStatus(isWaiting);
    }
    async getAppWaitingStatus() {
        return {
            status: await this.settingsService.getAppWaitingStatus()
        };
    }
    async changeSettings(createSettingDto) {
        return await this.settingsService.changeSettings(createSettingDto);
    }
    async getSettings() {
        return await this.settingsService.getSettings();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_setting_dto_1.CreateSettingDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "createPronouns", null);
__decorate([
    (0, common_1.Post)('app-status/:isWaiting'),
    __param(0, (0, common_1.Param)('isWaiting')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "setAppWaitingStatus", null);
__decorate([
    (0, common_1.Get)('app-status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getAppWaitingStatus", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_setting_dto_1.CreateSettingDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "changeSettings", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getSettings", null);
SettingsController = __decorate([
    (0, swagger_1.ApiTags)('Settings APIs'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
exports.SettingsController = SettingsController;
//# sourceMappingURL=settings.controller.js.map