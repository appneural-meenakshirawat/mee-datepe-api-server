import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpRequestDocument = OtpRequest & Document;

@Schema()
export class OtpRequest {
  @Prop({ required: true })
  otp: string;

  @Prop({ required: true, min: 10, max: 10 })
  mobileNo: string;

  @Prop({ default: Date.now, expires: 300 }) // expires in 5 minutes (300 seconds)
  createdAt: Date;
}

export const OtpRequestSchema = SchemaFactory.createForClass(OtpRequest);
