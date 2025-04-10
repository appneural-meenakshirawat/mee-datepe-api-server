import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { SharedModule } from 'src/@shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import UserPreferenceSchema from './schemas/me-preferences.schema';
import UserPhotoSchema from './schemas/me-photos.schema';
import { RegisterModule } from 'src/register/register.module';
import UserSettingsSchema from './schemas/me-settings.schema';
import UserProfileSchema from './schemas/me-profile.schema';

@Module({
  imports: [
    SharedModule,
    RegisterModule,
    MongooseModule.forFeature([
      { name: 'User-Preference', schema: UserPreferenceSchema },
      { name: 'User-Photo', schema: UserPhotoSchema },
      { name: 'User-Settings', schema: UserSettingsSchema },
      { name: 'User-Profile', schema: UserProfileSchema },
    ]),
  ],
  controllers: [MeController],
  providers: [MeService],
  exports: [MongooseModule, MeService],
})
export class MeModule {}
