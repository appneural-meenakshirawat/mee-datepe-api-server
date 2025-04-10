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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fs_1 = require("fs");
let SettingsService = class SettingsService {
    constructor(settingsModel) {
        this.settingsModel = settingsModel;
    }
    async saveSettings(createSettingDto) {
        const settings = await new this.settingsModel(createSettingDto).save();
        return settings;
    }
    async setAppWaitingStatus(isWaiting) {
        (0, fs_1.writeFileSync)('AppStatus', isWaiting == 'true' ? 'isWaitingActivated' : 'isWaitingDeactivated');
        return isWaiting;
    }
    async getAppWaitingStatus() {
        let isWaiting = (0, fs_1.readFileSync)('AppStatus', 'utf-8');
        return (isWaiting == 'isWaitingActivated') ? 'Activated' : 'Deactivated';
    }
    async changeSettings(property) {
        const settings = await this.settingsModel.findOneAndUpdate({}, { $set: { property } });
        return settings;
    }
    async getSettings() {
        const settings = await this.settingsModel.find({ type: 'pronoun' });
        return settings.map((pronoun) => ({
            _id: pronoun._id,
            name: pronoun.name,
        }));
        return settings;
    }
};
SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Settings')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map