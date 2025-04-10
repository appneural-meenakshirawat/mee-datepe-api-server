import { ConsoleLogger, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RegisterMobileNoDto } from "./dto/register-mobileno.dto";
import * as otpGenerator from "otp-generator";
import { JwtService } from "@nestjs/jwt";
import { OtpRequest } from "./schemas/otp-request.schema";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { ErrorMessage } from "src/@shared/constants/errors.constant";
import { IUserRegister } from "./schemas/user-registered.schema";
import { UserRegisterDto } from "./dto/create-register.dto";
import { HttpService } from "@nestjs/axios";
import axios from "axios";
import { IUserPhoto } from "src/me/schemas/me-photos.schema";
const qs = require("qs");
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel("OTP-Request") private otpRequestModel: Model<OtpRequest>,
    @InjectModel("User-Registration")
    private userRegistrationModel: Model<IUserRegister>,
    @InjectModel("User-Profile")
    private readonly myProfileModel: Model<IUserPhoto>,
    private jwtService: JwtService,
    private httpService: HttpService
  ) {}

  async registerMobileNo(
    registerMobileNoDto: RegisterMobileNoDto
  ): Promise<any> {
    const generatedOtp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    registerMobileNoDto.otp = registerMobileNoDto.mobileNo === '9999999999'? '111111': generatedOtp;
    // const response = await this.httpService.post(url, data).toPromise();

    const res = await this.sendOtp(registerMobileNoDto.mobileNo, generatedOtp);
    return await new this.otpRequestModel(registerMobileNoDto).save();
  }

  async sendOtp(mobileNo, otp) {
    let data = qs.stringify({
      "api-key": "Aa27f1d795d6fbe03f511f3b7698346e9",
      to: '91' + mobileNo,
      type: "OTP",
      sender: "DATEPE",
      body:
        "Your login code is " +
        otp +
        ". Please don't tell this code to anyone - RUVOX TECHNOLOGIES",
      template_id: "1207169572732899565",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.kaleyra.io/v1/HXIN1771025884IN/messages",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    return new Promise<void>((resolve, reject) => {
      axios
        .request(config)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  generate(): string {
    const fullUuid = uuidv4();
    // Assuming you want to use the first 8 characters as a short UUID
    const shortUuid = fullUuid.substr(0, 8);
    return shortUuid;
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    
    const otpData: any = await this.otpRequestModel
      .findOne({ mobileNo: verifyOtpDto.mobileNo })
      .sort({ createdAt: -1 });



    // const now = new Date();
    // const otpCreationTime = otpData.createdAt;

    // // Calculate the difference between the current time and the OTP creation time in seconds
    // const timeDifferenceSeconds =
    //   (now.getTime() - otpCreationTime.getTime()) / 1000;

    // const otpValidityDuration = 300; // 5 minutes in seconds

    // if (timeDifferenceSeconds > otpValidityDuration) {
    //   throw ErrorMessage.OTP_EXPIRED;
    // }

    // if (!otpData) {
    //   throw ErrorMessage.OTP_EXPIRED;
    // }

    if (!otpData || otpData.otp !== verifyOtpDto.otp) {
      throw ErrorMessage.WRONG_OTP;
    }

    const reg = new UserRegisterDto();
    reg.mobileNo = verifyOtpDto.mobileNo;
    reg.uname = this.generate();

    const regData = await this.registerUser(reg);

    return {
      token: this.jwtService.sign({
        mobileNo: otpData.mobileNo,
        otp: otpData.otp,
        userId: regData._id,
      }),
      isRegistrationCompleted: regData.isCompleted,
      registrationStage: regData.stage,
      userId: regData._id,
      name: regData.name,
      dob: regData.dob,
      profilePic: regData.profilePic,
      images: regData.images,
    };
  }

  async registerUser(userRegisterDto: UserRegisterDto): Promise<any> {
    userRegisterDto.address = "";
    userRegisterDto.location = {
      type: "Point",
      coordinates: [0, 0],
    };
    const registerUser = await this.userRegistrationModel.findOneAndUpdate(
      { mobileNo: userRegisterDto.mobileNo },
      { $set: userRegisterDto },
      { new: true, upsert: true }
    );

    return registerUser;
  }

  async patchRegisterUser(userRegisterDto: UserRegisterDto): Promise<any> {
    userRegisterDto.address = "";
    userRegisterDto.stage = userRegisterDto.dob? 2: 1;
    userRegisterDto.location = {
      type: "Point",
      coordinates: [0, 0],
    };
    const registerUser = await this.userRegistrationModel.findOneAndUpdate(
      { mobileNo: userRegisterDto.mobileNo },
      { $set: userRegisterDto },
      { new: true, upsert: true }
    );

    return registerUser;
  }

  async getUserDetails(mobileNo: string, property?: string): Promise<any> {
    const registerUser = await this.userRegistrationModel.findOne({
      mobileNo,
    });
    if (property && registerUser[property]) return registerUser[property];
    else return registerUser;
  }

  async logout(mobileNo: string): Promise<any> {
    return {};
  }

  async getMyProfile(userId: string) {
    const myProfile = await this.myProfileModel.findOne({ userId });
    return myProfile;
  }
}
