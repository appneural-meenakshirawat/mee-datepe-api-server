import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserChatSettingDto {
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
