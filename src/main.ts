import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import { readFileSync } from 'fs';

async function bootstrap() {
  // const httpsOptions = {
  //   key: readFileSync('/etc/letsencrypt/live/hostlyup.com/privkey.pem'),
  //   cert: readFileSync('/etc/letsencrypt/live/hostlyup.com/fullchain.pem'),
  // };

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  
  const config = new DocumentBuilder()
    .setTitle('DatePe')
    .setDescription('Dating Application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  

  // await app.listen(configService.get('http.port'));
  await app.listen(3000);
}
bootstrap();
