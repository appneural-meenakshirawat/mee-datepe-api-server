import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserSettingDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  notification: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readReceipt: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  activityStatus: boolean;

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty()
  userId: string;
}
