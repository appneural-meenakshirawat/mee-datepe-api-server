import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferencesDto } from './dto/create-preference.dto';
import { Me } from 'src/me/me.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IPreference } from './interfaces/preferences.interface';
import { ResponseError, ResponseSuccess } from 'src/@shared/dtos/response.dto';
import { Message } from 'src/@shared/constants/messages.constant';
import { ErrorMessage } from 'src/@shared/constants/errors.constant';

@ApiTags('Preferences APIs')
@ApiBearerAuth()
@Controller()
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post('gender')
  async createGender(@Body() createPreferenceDto: CreatePreferencesDto) {
    createPreferenceDto.type = 'gender';
    return await this.preferencesService.createPreferences(createPreferenceDto);
  }

  @Get('gender')
  async getGender() {
    const data = await this.preferencesService.getPreferences('gender');
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }
  
  @Post('pronouns')
  async createPronouns(@Body() createPreferenceDto: CreatePreferencesDto) {
    createPreferenceDto.type = 'pronoun';
    return await this.preferencesService.createPreferences(createPreferenceDto);
  }

  @Get('pronouns')
  async getPronouns() {
    const data = await this.preferencesService.getPreferences('pronoun');
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }

  @Post('sexual-preferences')
  async createSexualPreferences(
    @Body() createPreferenceDto: CreatePreferencesDto,
  ) {
    createPreferenceDto.type = 'sexual-preference';
    return await this.preferencesService.createPreferences(createPreferenceDto);
  }

  @Get('sexual-preferences')
  async getSexualPreferences() {
    const data = await this.preferencesService.getPreferences('sexual-preference');
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }

  @Post('sexual-orientation')
  async createSexualOrientation(
    @Body() createPreferenceDto: CreatePreferencesDto,
  ) {
    createPreferenceDto.type = 'sexual-orientation';
    return await this.preferencesService.createPreferences(createPreferenceDto);
  }

  @Get('sexual-orientation')
  async getSexualOrientation() {
    const data = await this.preferencesService.getPreferences('sexual-orientation');
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }

  @Post('looking-for')
  async createLookingFor(@Body() createPreferenceDto: CreatePreferencesDto) {
    createPreferenceDto.type = 'looking-for';
    return await this.preferencesService.createPreferences(createPreferenceDto);
  }

  @Get('looking-for')
  async getLookingFor() {
    const data = await this.preferencesService.getPreferences('looking-for');
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }

  @Post('you-are-into')
  async createYouAreInto(@Body() createPreferenceDto: CreatePreferencesDto) {
    createPreferenceDto.type = 'you-are-into';
    return await this.preferencesService.createPreferences(createPreferenceDto);
  }

  @Get('you-are-into')
  async getYouAreInto() {
    const data = await this.preferencesService.getPreferences('you-are-into');
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }

  @Get()
  async getAllPreferences(): Promise<IPreference[]> {
    return await this.preferencesService.getAllPreferences();
  }
}
