import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class MePreferencesDto {
  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  preferenceId: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  set: boolean;

  type: string;

  regStage: number;
}
