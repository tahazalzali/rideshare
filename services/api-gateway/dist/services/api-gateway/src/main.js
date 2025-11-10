"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const common_2 = require("@rides/common");
const swagger_1 = require("@nestjs/swagger");
const common_3 = require("@rides/common");
async function bootstrap() {
    await (0, common_3.initTracing)('api-gateway');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: false,
        }
    });
    app.setGlobalPrefix('api');
    app.enableVersioning({ type: common_1.VersioningType.URI });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
        crossOriginOpenerPolicy: false,
    }));
    app.use(common_2.correlationIdMiddleware);
    app.use(common_2.metricsMiddleware);
    app.getHttpAdapter().getInstance().get('/metrics', common_2.metricsHandler);
    app.getHttpAdapter().getInstance().get('/health', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
        res.json({ status: 'ok', service: 'api-gateway' });
    });
    app.useGlobalInterceptors(new common_2.LoggingInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ride Sharing API Gateway')
        .setDescription('Gateway for ride-sharing microservices')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/docs', app, document);
    await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map