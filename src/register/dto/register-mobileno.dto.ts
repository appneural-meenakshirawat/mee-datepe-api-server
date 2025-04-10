import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone } from 'class-validator';

export class RegisterMobileNoDto {
  @ApiProperty()
  @IsMobilePhone()
  mobileNo: string;

  otp: string;
}
