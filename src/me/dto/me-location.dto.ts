import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MeLocationDto {
  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;


  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  longitude: number;
}
