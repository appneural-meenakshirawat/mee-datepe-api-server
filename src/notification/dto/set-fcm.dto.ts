
import { ApiProperty } from '@nestjs/swagger';


export class FCMTokenDto {
  @ApiProperty({ description: 'Device token for the push notification'})
  public readonly fcmToken: string;

  
  @ApiProperty()
  public readonly userId: string;
}
