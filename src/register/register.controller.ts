import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterMobileNoDto } from './dto/register-mobileno.dto';
import { ResponseError, ResponseSuccess } from 'src/@shared/dtos/response.dto';
import { Message } from 'src/@shared/constants/messages.constant';
import { ErrorMessage } from 'src/@shared/constants/errors.constant';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UserRegisterDto } from './dto/create-register.dto';
import { Me } from 'src/me/me.decorator';
import { JwtService } from '@nestjs/jwt';
import { IUserRegister } from './schemas/user-registered.schema';
import { UpdateUserRegisterDto } from './dto/update-register.dto';

@ApiTags('Register APIs')
@ApiBearerAuth()
@Controller()
export class RegisterController {
  constructor(
    private readonly registerService: RegisterService,
    private jwtService: JwtService,
  ) {}

  @Post('mobileno')
  async registerMobileNo(@Body() registerMobileNoDto: RegisterMobileNoDto) {
    const data = await this.registerService.registerMobileNo(
      registerMobileNoDto,
    );
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_SENT);
    } else {
      return new ResponseError(ErrorMessage.UNABLE_TO_SEND_OTP_RETRY);
    }
  }

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const otpData = await this.registerService.verifyOtp(verifyOtpDto);
    if (otpData) {
      return new ResponseSuccess(Message.SUCCESSFULLY_VERIFIED, otpData);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_VERIFIED, null);
    }
  }

  @Get('profile/:userId')
  async getProfile(@Me() me: string, @Param('userId') userId: string) {
    const userPayload: any = this.jwtService.decode(me);
    const data = await this.registerService.getMyProfile(userId);
    if (data) {
      return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, data);
    } else {
      return new ResponseError(ErrorMessage.NOT_FOUND, null);
    }
  }

  @Post('user-data')
  async registerUserData(
    @Body() userRegisterDto: UserRegisterDto,
    @Me() me: string,
  ) {
    const userPayload: any = this.jwtService.decode(me);
    userRegisterDto.mobileNo = userPayload.mobileNo;
    const otpData = await this.registerService.registerUser(userRegisterDto);
    if (otpData) {
      return new ResponseSuccess(Message.SUCCESSFULLY_REGISTERED, otpData);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_VERIFIED, null);
    }
  }

  @Patch('user-data')
  async patchRegisterUserData(
    @Body() userRegisterDto: UpdateUserRegisterDto,
    @Me() me: string,
  ) {
    const userPayload: any = this.jwtService.decode(me);
    userRegisterDto.mobileNo = userPayload.mobileNo;
    const otpData = await this.registerService.patchRegisterUser(userRegisterDto);
    if (otpData) {
      return new ResponseSuccess(Message.SUCCESSFULLY_REGISTERED, otpData);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_VERIFIED, null);
    }
  }

  @Get('user-data')
  async getUserDetails(@Me() me: string): Promise<IUserRegister> {
    const userPayload: any = this.jwtService.decode(me);
    return await this.registerService.getUserDetails(userPayload.mobileNo);
  }

  @Get('user-data/name')
  async getUserName(@Me() me: string): Promise<IUserRegister> {
    const userPayload: any = this.jwtService.decode(me);
    return await this.registerService.getUserDetails(
      userPayload.mobileNo,
      'name',
    );
  }

  @Get('user-data/dob')
  async getDob(@Me() me: string): Promise<IUserRegister> {
    const userPayload: any = this.jwtService.decode(me);
    return await this.registerService.getUserDetails(
      userPayload.mobileNo,
      'dob',
    );
  }

  @Post('logout')
  async logout(@Me() me: string) {
    const userPayload: any = this.jwtService.decode(me);
    const otpData = await this.registerService.logout(userPayload.mobileNo);
    if (otpData) {
      return new ResponseSuccess(Message.SUCCESSFULLY_VERIFIED, otpData);
    } else {
      return new ResponseError(ErrorMessage.NOT_SUCCESSFULLY_VERIFIED, null);
    }
  }
}
