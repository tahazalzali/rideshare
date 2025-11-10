"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const payment_auth_entity_1 = require("./domain/payment-auth.entity");
const payment_service_1 = require("./domain/payment.service");
const payment_message_controller_1 = require("./transport/payment.message.controller");
const common_2 = require("@rides/common");
const payment_http_controller_1 = require("./transport/payment.http.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'postgres',
                    host: process.env.DB_HOST || 'localhost',
                    port: +(process.env.DB_PORT || 5436),
                    username: process.env.DB_USER || 'payment',
                    password: process.env.DB_PASS || 'payment',
                    database: process.env.DB_NAME || 'payment',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([payment_auth_entity_1.PaymentAuth]),
            common_2.RmqModule,
        ],
        providers: [payment_service_1.PaymentService],
        controllers: [payment_message_controller_1.PaymentMessageController, payment_http_controller_1.PaymentHttpController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map