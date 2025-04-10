import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { SharedModule } from 'src/@shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpRequestSchema } from './schemas/otp-request.schema';
import { UserRegisterSchema } from './schemas/user-registered.schema';
import UserProfileSchema from 'src/me/schemas/me-profile.schema';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: 'OTP-Request', schema: OtpRequestSchema },
      { name: 'User-Registration', schema: UserRegisterSchema },
      { name: 'User-Profile', schema: UserProfileSchema },
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [MongooseModule]
})
export class RegisterModule {}
