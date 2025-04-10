import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Settings APIs')
@ApiBearerAuth()
@Controller()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  async createPronouns(@Body() createSettingDto: CreateSettingDto) {
    return await this.settingsService.saveSettings(createSettingDto);
  }

  @Post('app-status/:isWaiting')
  async setAppWaitingStatus(@Param('isWaiting') isWaiting: string) {
    return await this.settingsService.setAppWaitingStatus(isWaiting);
  }

  @Get('app-status')
  async getAppWaitingStatus() {
    return {
      status: await this.settingsService.getAppWaitingStatus()
    };
  }

  @Patch()
  async changeSettings(@Body() createSettingDto: CreateSettingDto) {
    return await this.settingsService.changeSettings(createSettingDto);
  }

  @Get()
  async getSettings() {
    return await this.settingsService.getSettings();
  }
}
