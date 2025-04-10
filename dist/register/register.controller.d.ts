import { RegisterService } from './register.service';
import { RegisterMobileNoDto } from './dto/register-mobileno.dto';
import { ResponseError, ResponseSuccess } from 'src/@shared/dtos/response.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UserRegisterDto } from './dto/create-register.dto';
import { JwtService } from '@nestjs/jwt';
import { IUserRegister } from './schemas/user-registered.schema';
import { UpdateUserRegisterDto } from './dto/update-register.dto';
export declare class RegisterController {
    private readonly registerService;
    private jwtService;
    constructor(registerService: RegisterService, jwtService: JwtService);
    registerMobileNo(registerMobileNoDto: RegisterMobileNoDto): Promise<ResponseError | ResponseSuccess>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<ResponseError | ResponseSuccess>;
    getProfile(me: string, userId: string): Promise<ResponseError | ResponseSuccess>;
    registerUserData(userRegisterDto: UserRegisterDto, me: string): Promise<ResponseError | ResponseSuccess>;
    patchRegisterUserData(userRegisterDto: UpdateUserRegisterDto, me: string): Promise<ResponseError | ResponseSuccess>;
    getUserDetails(me: string): Promise<IUserRegister>;
    getUserName(me: string): Promise<IUserRegister>;
    getDob(me: string): Promise<IUserRegister>;
    logout(me: string): Promise<ResponseError | ResponseSuccess>;
}
