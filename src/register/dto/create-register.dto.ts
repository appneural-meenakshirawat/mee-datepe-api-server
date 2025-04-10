import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  uname: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // @MinLength(10)
  // @Matches(/^\+\d{1,3}-\d{6,14}$/)
  mobileNo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  dob: string;

  address: string;
  location: {
    type: string;
    coordinates: [number, number];
  };

  stage: number
}
