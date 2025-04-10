import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ISettings } from './schemas/settings.schema';
import { readFileSync, writeFileSync } from 'fs';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel('Settings')
    private readonly settingsModel: Model<ISettings>,
  ) {}

  async saveSettings(createSettingDto: CreateSettingDto) {
    const settings = await new this.settingsModel(createSettingDto).save();
    return settings;
  }

  async setAppWaitingStatus(isWaiting: string) {
    writeFileSync('AppStatus', isWaiting == 'true' ? 'isWaitingActivated': 'isWaitingDeactivated');
    return isWaiting;
  }

  async getAppWaitingStatus() {
    let isWaiting = readFileSync('AppStatus', 'utf-8');
    return (isWaiting == 'isWaitingActivated')? 'Activated' : 'Deactivated';
  }

  async changeSettings(property: any) {
    const settings = await this.settingsModel.findOneAndUpdate(
      {},
      { $set: { property } },
    );
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
}
