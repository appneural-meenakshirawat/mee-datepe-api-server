"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const all_exception_filter_1 = require("./filters/all-exception.filter");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const throttler_1 = require("@nestjs/throttler");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const multer_1 = require("@nestjs/platform-express/multer");
const multerS3 = require('multer-s3');
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = require("crypto");
const s3 = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: "AKIAYWVYQJFXVAH2JXX2",
        secretAccessKey: "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"
    },
    region: "ap-south-1"
});
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/datepe'),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 10,
            }),
            multer_1.MulterModule.register({
                storage: multerS3({
                    s3: s3,
                    bucket: 'datepe-images',
                    key: function (req, file, cb) {
                        cb(null, `${(0, crypto_1.randomUUID)()}-${file.originalname}`);
                    }
                })
            }),
            mailer_1.MailerModule.forRoot({
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
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            jwt_1.JwtModule.register({
                secret: 'secretKey',
                signOptions: { expiresIn: '1h' },
            }),
            axios_1.HttpModule,
        ],
        exports: [
            mongoose_1.MongooseModule,
            throttler_1.ThrottlerModule,
            mailer_1.MailerModule,
            jwt_1.JwtModule,
            axios_1.HttpModule,
            config_1.ConfigModule,
            multer_1.MulterModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: all_exception_filter_1.AllExceptionFilter,
            },
        ],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map