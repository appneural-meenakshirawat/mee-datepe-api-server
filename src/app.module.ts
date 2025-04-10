import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AppRoutingModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '.', 'uploads'),
    }),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
