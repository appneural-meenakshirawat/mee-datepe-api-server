import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(6)
  @MaxLength(6)
  otp: string;

  @ApiProperty()
  @MinLength(10)
  @MaxLength(10)
  @IsNotEmpty()
  @IsString()
  mobileNo: string;
}
