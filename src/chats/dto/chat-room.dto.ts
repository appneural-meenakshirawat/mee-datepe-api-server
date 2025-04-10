import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateRoomDto {
  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty({ type: String })
  meId: string;


  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
