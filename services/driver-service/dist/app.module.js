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
const driver_entity_1 = require("./domain/driver.entity");
const driver_service_1 = require("./domain/driver.service");
const driver_message_controller_1 = require("./transport/driver.message.controller");
const common_2 = require("@rides/common");
const driver_http_controller_1 = require("./transport/driver.http.controller");
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
                    username: process.env.DB_USER || 'driver',
                    password: process.env.DB_PASS || 'driver',
                    database: process.env.DB_NAME || 'driver',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([driver_entity_1.Driver]),
            common_2.RmqModule,
        ],
        providers: [driver_service_1.DriverService],
        controllers: [driver_message_controller_1.DriverMessageController, driver_http_controller_1.DriverHttpController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map