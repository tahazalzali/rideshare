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
const throttler_1 = require("@nestjs/throttler");
const common_2 = require("@rides/common");
const trip_controller_1 = require("./trip/trip.controller");
const pricing_controller_1 = require("./pricing/pricing.controller");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./auth/user.entity");
const users_service_1 = require("./auth/users.service");
const http_circuit_service_1 = require("./common/http-circuit.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'postgres',
                    host: process.env.DB_HOST || 'localhost',
                    port: +(process.env.DB_PORT || 5432),
                    username: process.env.DB_USER || 'postgres',
                    password: process.env.DB_PASS || 'postgres',
                    database: process.env.DB_NAME || 'gateway',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            common_2.RmqModule.register([
                { name: 'TRIP', queue: process.env.QUEUE_TRIP || 'trip_queue' },
                { name: 'PRICING', queue: process.env.QUEUE_PRICING || 'pricing_queue' },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [trip_controller_1.TripController, pricing_controller_1.PricingController],
        providers: [users_service_1.UsersService, http_circuit_service_1.HttpCircuitService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map