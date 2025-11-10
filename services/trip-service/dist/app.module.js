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
const trip_entity_1 = require("./domain/trip.entity");
const trip_repository_1 = require("./infra/trip.repository");
const trip_service_1 = require("./domain/trip.service");
const trip_message_controller_1 = require("./transport/trip.message.controller");
const common_2 = require("@rides/common");
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
                    port: +(process.env.DB_PORT || 5432),
                    username: process.env.DB_USER || 'trip',
                    password: process.env.DB_PASS || 'trip',
                    database: process.env.DB_NAME || 'trip',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([trip_entity_1.Trip]),
            common_2.RmqModule.register([
                { name: 'PRICING', queue: process.env.QUEUE_PRICING || 'pricing_queue' },
                { name: 'PAYMENT', queue: process.env.QUEUE_PAYMENT || 'payment_queue' },
                { name: 'DRIVER', queue: process.env.QUEUE_DRIVER || 'driver_queue' },
            ]),
        ],
        providers: [trip_repository_1.TripRepository, trip_service_1.TripService],
        controllers: [trip_message_controller_1.TripMessageController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map