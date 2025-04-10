import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MeProfileDto {
  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty()
  userId: string;

  photo1: string;

  photo2: string;

  photo3: string;

  photo4: string;

  // @IsNotEmpty()
  @ApiProperty()
  interest: [string];

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  bio: string;
}
