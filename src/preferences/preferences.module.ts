import { Module } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { SharedModule } from 'src/@shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferencesSchema } from './schemas/preferences.schema';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: 'Preference', schema: PreferencesSchema },
    ]),
  ],
  controllers: [PreferencesController],
  providers: [PreferencesService],
  exports: [MongooseModule]
})
export class PreferencesModule {}
