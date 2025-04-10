import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { RegisterModule } from './register/register.module';
import { PreferencesModule } from './preferences/preferences.module';
import { MeModule } from './me/me.module';
import { MatchModule } from './match/match.module';
import { NotificationModule } from './notification/notification.module';
import { SettingsModule } from './settings/settings.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'register',
        module: RegisterModule,
      },
      {
        path: 'preference',
        module: PreferencesModule,
      },
      {
        path: 'me',
        module: MeModule,
      },
      {
        path: 'match',
        module: MatchModule,
      },
      {
        path: 'chats',
        module: ChatsModule,
      },
      {
        path: 'settings',
        module: SettingsModule,
      },
      {
        path: 'notifications',
        module: NotificationModule,
      },
    ]),
    RegisterModule,
    PreferencesModule,
    MeModule,
    MatchModule,
    NotificationModule,
    SettingsModule,
    ChatsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
