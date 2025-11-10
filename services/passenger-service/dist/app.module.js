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
const passenger_entity_1 = require("./domain/passenger.entity");
const passenger_service_1 = require("./domain/passenger.service");
const passenger_message_controller_1 = require("./transport/passenger.message.controller");
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
                    username: process.env.DB_USER || 'passenger',
                    password: process.env.DB_PASS || 'passenger',
                    database: process.env.DB_NAME || 'passenger',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([passenger_entity_1.Passenger]),
        ],
        providers: [passenger_service_1.PassengerService],
        controllers: [passenger_message_controller_1.PassengerMessageController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map