import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePreferencesDto } from './dto/create-preference.dto';
import { IPreference } from './interfaces/preferences.interface';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel('Preference')
    private readonly preferencesModel: Model<IPreference>,
  ) {}

  async createPreferences(createPreferencesDto: CreatePreferencesDto) {
    const preferences = await this.preferencesModel.findOneAndUpdate(
      { name: createPreferencesDto.name, type: createPreferencesDto.type },
      { $set: createPreferencesDto },
      { new: true, upsert: true },
    );
    return preferences;
  }

  async getPreferences(type: string) {
    const preferences = await this.preferencesModel.find({ type });
    return preferences.map((pronoun) => ({
      _id: pronoun._id,
      name: pronoun.name,
    }));
    return preferences;
  }

  async getAllPreferences(): Promise<IPreference[]> {
    return this.preferencesModel.find().exec();
  }
}
