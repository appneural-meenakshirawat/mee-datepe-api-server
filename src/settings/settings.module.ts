import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { SharedModule } from 'src/@shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import SettingsSchema from './schemas/settings.schema';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: 'Settings', schema: SettingsSchema }]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
