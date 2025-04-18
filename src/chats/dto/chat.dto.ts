import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ type: String })
  message: string;

  // @ApiProperty({ type: String })
  sentTo: string;

  // @IsOptional()
  sentBy: string;

  // @ApiProperty()
  messagingPayload: object;
}
