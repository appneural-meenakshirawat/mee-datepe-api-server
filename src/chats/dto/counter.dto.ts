import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class CreateCounterDto {
  @ApiProperty({ type: String })
  cardId: string;

  @ApiProperty({ type: String })
  sentTo: string;

  @IsOptional()
  sentBy: string;

  @ApiProperty({ type: String })
  amount: string;

  messagingPayload: object;
}
