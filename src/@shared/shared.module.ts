import { AllExceptionFilter } from './filters/all-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
const multerS3 = require('multer-s3')
import { S3 } from 'aws-sdk'
import { S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

// AWS.config.update({
//   secretAccessKey: 'ZF5z7JD5QGTSPHH/EqbMSY5lIu7NgQJir8C6gjkM',
//   accessKeyId: 'AKIAYWVYQJFXVAH2JXX2',
//   region: 'ap-south-1'
// });

// const s3 = new S3({
//   secretAccessKey: 'ZF5z7JD5QGTSPHH/EqbMSY5lIu7NgQJir8C6gjkM',
//   accessKeyId: 'AKIAYWVYQJFXVAH2JXX2',
//   region: 'ap-south-1'
// });

const s3 = new S3Client({
  credentials: {
      accessKeyId: "AKIAYWVYQJFXVAH2JXX2", // store it in .env file to keep it safe
      secretAccessKey: "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"
  },
  region: "ap-south-1" // this is the region that you select in AWS account
});

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/datepe'),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MulterModule.register({
      storage: multerS3({
        s3: s3,
        bucket: 'datepe-images',
        key: function (req, file, cb) {
          cb(null, `${randomUUID()}-${file.originalname}`); //use Date.now() for unique file keys
        }
      })
    }),
    MailerModule.forRoot({
      transport: {
        host: 'email-smtp.ap-south-1.amazonaws.com',
        port: 587,
        secure: false,
        auth: {
          user: 'AKIAYWVYQJFXTZ2SMBED',
          pass: 'BDCd8WFwjTY/+2bp80DC/VjINYCU+0GE0BswI7gB1fci',
        },
      },
      defaults: {
        from: 'noreply@example.com',
      },
      template: {
        dir: './templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
    HttpModule,
  ],
  exports: [
    MongooseModule,
    ThrottlerModule,
    MailerModule,
    JwtModule,
    HttpModule,
    ConfigModule,
    MulterModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class SharedModule { }
