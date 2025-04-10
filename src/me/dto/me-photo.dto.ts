import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MePhotoDto {
  @IsNotEmpty()
  @IsString()
  // @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  // @ApiProperty()
  photo1: string;

  @IsNotEmpty()
  @IsString()
  // @ApiProperty()
  photo2: string;

  @IsNotEmpty()
  @IsString()
  // @ApiProperty()
  photo3: string;

  @IsNotEmpty()
  @IsString()
  // @ApiProperty()
  photo4: string;
}
