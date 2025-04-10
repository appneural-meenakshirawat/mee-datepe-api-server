import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  UseInterceptors,
  UploadedFiles,
  Param,
  Res,
  Query,
  ConsoleLogger,
} from '@nestjs/common';
import { MeService } from './me.service';
import { IUserPreference } from './schemas/me-preferences.schema';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { MePreferencesDto } from './dto/me-preference.dto';
import { Me } from 'src/me/me.decorator';
import { JwtService } from '@nestjs/jwt';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { RenameFilesInterceptor } from './utils/file-upload.utils';
import { IUserRegister } from 'src/register/schemas/user-registered.schema';
import { IResponse } from 'src/@shared/interfaces/response.interface';
import { ResponseError, ResponseSuccess } from 'src/@shared/dtos/response.dto';
import { Message } from 'src/@shared/constants/messages.constant';
import { MeLocationDto } from './dto/me-location.dto';
import { ErrorMessage } from 'src/@shared/constants/errors.constant';
import { CreateUserSettingDto } from './dto/me-setting.dto';
import { CreateUserAccountSettingDto } from './dto/me-account-setting.dto';
import { CreateUserChatSettingDto } from './dto/me-chat-setting.dto';
import { MeProfileDto } from './dto/me-profile.dto';
import { join } from 'path';
import { Response } from 'express';

class UploadPhotosDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  images: any[];
}

@ApiTags('Me APIs')
@ApiBearerAuth()
@Controller()
export class MeController {
  constructor(
    private readonly meService: MeService,
    private jwtService: JwtService,
  ) {}

  @Post('profile')
  async setProfile(@Body() meProfileDto: MeProfileDto, @Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    meProfileDto.userId = userPayload.mobileNo;
    return await this.meService.setMyProfile(meProfileDto);
  }

  @Post('profile/:uname')
  async setUserName(@Param('uname') uname: string, @Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    return await this.meService.setUserName(userPayload.mobileNo, uname);
  }

  @Get('profile')
  async getProfile(@Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.meService.getMyProfile(userPayload.mobileNo);
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }

  @Get('images/:path')
  async serveImage(@Param('path') filepath: string, @Res() res: Response) {
    const imagePath = join(__dirname, '..', filepath);

    // Ensure the image exists
    try {
      res.sendFile(imagePath);
    } catch (error) {
      // Handle error, e.g., send a 404 response
      res.status(404).send('Image not found');
    }
  }
  

  @Post('preferences/gender')
  async setMyGender(
    @Body() mePreferencesDto: MePreferencesDto,
    @Me() me: string,
  ) {
    const userPayload: any = this.jwtService.decode(me);
    mePreferencesDto.userId = userPayload.mobileNo;
    mePreferencesDto.type = 'gender';
    mePreferencesDto.regStage = 3;
    return await this.meService.setMyPreference(mePreferencesDto, true);
  }

  @Get('preferences/gender')
  async getMyGender(@Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.meService.getMyPreference(
      userPayload.mobileNo,
      'gender',
    );
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }

  @Post('preferences/pronouns')
  async setMyPronouns(
    @Body() mePreferencesDto: MePreferencesDto,
    @Me() me: string,
  ) {
    const userPayload: any = this.jwtService.decode(me);
    mePreferencesDto.userId = userPayload.mobileNo;
    mePreferencesDto.type = 'pronoun';
    mePreferencesDto.regStage = 3;
    return await this.meService.setMyPreference(mePreferencesDto);
  }

  @Get('preferences/pronouns')
  async getMyPronouns(@Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.meService.getMyPreference(
      userPayload.mobileNo,
      'pronoun',
    );
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }

  @Post('preferences/sexual-preferences')
  async setMySexualPreferences(
    @Body() mePreferencesDto: MePreferencesDto,
    @Me() me: string,
  ) {
    const userPayload: any = this.jwtService.decode(me);
    mePreferencesDto.userId = userPayload.mobileNo;
    mePreferencesDto.type = 'sexual-preference';
    mePreferencesDto.regStage = 4;
    return await this.meService.setMyPreference(mePreferencesDto, true);
  }

  @Get('preferences/sexual-preferences')
  async getMySexualPreferences(@Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.meService.getMyPreference(
      userPayload.mobileNo,
      'sexual-preference',
    );
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }

  @Post('preferences/sexual-orientation')
  async setMySexualOrientation(
    @Body() mePreferencesDto: MePreferencesDto,
    @Me() me: string,
  ) {
    const userPayload: any = this.jwtService.decode(me);
    mePreferencesDto.userId = userPayload.mobileNo;
    mePreferencesDto.type = 'sexual-orientation';
    mePreferencesDto.regStage = 5;
    return await this.meService.setMyPreference(mePreferencesDto);
  }

  @Get('preferences/sexual-orientation')
  async getMySexualOrientation(@Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.meService.getMyPreference(
      userPayload.mobileNo,
      'sexual-orientation',
    );
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }

  @Post('preferences/looking-for')
  async setMyLookingFor(
    @Body() mePreferencesDto: MePreferencesDto,
    @Me() me: string,
  ) {
    const userPayload: any = this.jwtService.decode(me);
    mePreferencesDto.userId = userPayload.mobileNo;
    mePreferencesDto.type = 'looking-for';
    mePreferencesDto.regStage = 6;
    return await this.meService.setMyPreference(mePreferencesDto, true);
  }

  @Get('preferences/looking-for')
  async getMyLookingFor(@Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.meService.getMyPreference(
      userPayload.mobileNo,
      'looking-for',
    );
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }

  @Post('preferences/you-are-into')
  async setYouAreInto(
    @Body() mePreferencesDto: MePreferencesDto,
    @Me() me: string,
  ) {
    const userPayload: any = this.jwtService.decode(me);
    mePreferencesDto.userId = userPayload.mobileNo;
    mePreferencesDto.type = 'you-are-into';
    mePreferencesDto.regStage = 6;
    return await this.meService.setMyPreference(mePreferencesDto);
  }

  @Get('preferences/you-are-into')
  async getYouAreInto(@Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.meService.getMyPreference(
      userPayload.mobileNo,
      'you-are-into',
      true
    );
    const youRInto = data.preferenceIds.map((p: any) => p.name);
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, youRInto);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }

  @Get('preferences')
  async getMyAllPreferences(@Me() me: string): Promise<IResponse> {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.meService.getMyAllPreference(userPayload.mobileNo, true);
    let allPreferences = {};
    data.forEach(ap => {
      allPreferences[ap.type] = ap.preferenceIds.map((p: any) => p.name)
    })
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, allPreferences);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }

  @Post('photos')
  // @UseInterceptors(FilesInterceptor('images', 4))
  @UseInterceptors(FilesInterceptor('images'), RenameFilesInterceptor)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of photos to upload',
    type: UploadPhotosDto,
  })
  async uploadPhoto(
    @UploadedFiles() photos,
    @Me() me: string,
  ): Promise<IResponse | IUserRegister> {
    // const response = {
    //   originalname: file.originalname,
    //   filename: file.filename,
    // };

    if (photos.length < 1) {
      throw ErrorMessage.PHOTO_MUST_BE_1;
    }
    const userPayload: any = this.jwtService.decode(me);
    const result = await this.meService.uploadPhoto(userPayload, photos);
    if (result) {
      return new ResponseSuccess(Message.SUCCESSFULLY_UPLOAD_PROFILE_PHOTO, {
        result,
      });
    } else {
      return new ResponseError(ErrorMessage.UNABLE_TO_UPLOAD_RETRY);
    }
  }

  @Post('current-location')
  async setCurrentLocation(
    @Body() meLocationDto: MeLocationDto,
    @Me() me: string,
  ) {
    const userPayload: any = this.jwtService.decode(me);
    meLocationDto.userId = userPayload.mobileNo;
    const location = await this.meService.setCurrentLocation(meLocationDto);
    if (location) {
      return new ResponseSuccess(Message.SUCCESSFULLY_SET_LOCATION);
    } else {
      return new ResponseError(ErrorMessage.UNABLE_TO_SET_LOCATION);
    }
  }

  @Get('current-location')
  async getCurrentLocation(@Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    const location = await this.meService.getCurrentLocation(
      userPayload.mobileNo,
    );
    if (location) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, location);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND);
    }
  }

  @Post('bio')
  async saveMyBio(
    @Body() meProfileDto: MeProfileDto,
    @Me() me: string,
  ) {
    const userPayload: any = this.jwtService.decode(me);
    meProfileDto.userId = userPayload.mobileNo;
    const mybio = await this.meService.setBio(meProfileDto);
    if (mybio) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, mybio);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND);
    }
  }

  @Get('bio')
  async getMyBio(@Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    const mybio = await this.meService.getBio(userPayload.mobileNo);
    if (mybio) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, mybio);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND);
    }
  }

  @Post('settings')
  async saveMySettings(
    @Body() createSettingDto: CreateUserSettingDto,
    @Me() me: string,
  ) {
    const userPayload: any = this.jwtService.decode(me);
    createSettingDto.userId = userPayload.mobileNo;
    return await this.meService.saveSettings(createSettingDto);
  }

  @Post('settings/user')
  async saveMyUserSettings(
    @Body() createUserAccountSettingDto: CreateUserAccountSettingDto,
    @Me() me: string,
  ) {
    const userPayload: any = this.jwtService.decode(me);
    createUserAccountSettingDto.userId = userPayload.mobileNo;
    return await this.meService.saveSettings({
      account: createUserAccountSettingDto,
    });
  }

  @Post('settings/chat')
  async saveMyChatSettings(
    @Body() createUserChatSettingDto: CreateUserChatSettingDto,
    @Me() me: string,
  ) {
    const userPayload: any = this.jwtService.decode(me);
    createUserChatSettingDto.userId = userPayload.mobileNo;
    return await this.meService.saveSettings({
      chat: createUserChatSettingDto,
    });
  }

  @Patch('settings')
  async changeSettings(
    @Body() createSettingDto: CreateUserSettingDto,
    @Me() me: string,
  ) {
    const userPayload: any = this.jwtService.decode(me);
    createSettingDto.userId = userPayload.mobileNo;
    return await this.meService.changeSettings(createSettingDto);
  }

  @Get('settings')
  async getSettings(@Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    return await this.meService.getSettings(userPayload.mobileNo);
  }

  @Get('settings/user')
  async getMyUserSettings(@Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    const data = (await this.meService.getSettings(userPayload.mobileNo))
      .account;
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_SAVED, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_SAVED, null);
    }
  }

  @Get('settings/chat')
  async getMyChatSettings(@Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    const data = (await this.meService.getSettings(userPayload.mobileNo)).chat;
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_SAVED, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_SAVED, null);
    }
  }

  // @Post('upload')
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(
  //   FilesInterceptor([
  //     { name: 'photo1', maxCount: 1 },
  //     { name: 'photo2', maxCount: 1 },
  //     { name: 'photo3', maxCount: 1 },
  //     { name: 'photo4', maxCount: 1 },
  //   ]),
  // )
  // async uploadPhotos(@UploadedFiles() photos: multer.File[]) {
  //   // Handle the uploaded photos here (e.g., save to a database, resize, etc.)
  //   // Each photo will be available as an element in the "photos" array

  //   const fileNames = photos.map((photo) => photo.filename);
  //   return { fileNames }; // Return the filenames of the uploaded photos
  // }
}
