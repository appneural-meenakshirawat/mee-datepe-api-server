"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const compression = require("compression");
const config_1 = require("@nestjs/config");
const bodyParser = require("body-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableVersioning({
        defaultVersion: '1',
        type: common_1.VersioningType.URI,
    });
    app.enableCors();
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(compression());
    app.useGlobalPipes(new common_1.ValidationPipe());
    const configService = app.get(config_1.ConfigService);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('DatePe')
        .setDescription('Dating Application')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/swagger', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map