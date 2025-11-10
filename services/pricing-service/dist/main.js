"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@rides/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
async function bootstrap() {
    await (0, common_1.initTracing)('pricing-service');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_2.ValidationPipe({ whitelist: true, transform: true }));
    const doc = new swagger_1.DocumentBuilder().setTitle('Pricing Service').setVersion('1.0').build();
    const docObj = swagger_1.SwaggerModule.createDocument(app, doc);
    swagger_1.SwaggerModule.setup('/docs', app, docObj);
    app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [process.env.RABBITMQ_URI || 'amqp://localhost:5672'],
            queue: process.env.QUEUE_PRICING || 'pricing_queue',
            queueOptions: { durable: true },
        },
    });
    await app.startAllMicroservices();
    await app.listen(process.env.PORT ? Number(process.env.PORT) : 3011);
}
bootstrap();
//# sourceMappingURL=main.js.map