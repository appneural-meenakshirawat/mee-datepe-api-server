import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePreferencesDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty()
  type: string;
}
