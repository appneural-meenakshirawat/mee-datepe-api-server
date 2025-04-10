import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength, isEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRegisterDto {
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  uname: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(10)
  // @Matches(/^\+\d{1,3}-\d{6,14}$/)
  mobileNo: string;

  // @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email: string;

  // @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  dob: string;

  address: string;
  location: {
    type: string;
    coordinates: [number, number];
  };

  stage: number
}
