"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverMessageController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@rides/common");
const driver_service_1 = require("../domain/driver.service");
let DriverMessageController = class DriverMessageController {
    drivers;
    rmq;
    constructor(drivers, rmq) {
        this.drivers = drivers;
        this.rmq = rmq;
    }
    async findAvailable(payload, ctx) {
        const d = await this.drivers.findAvailableNear(payload.lat, payload.lng);
        this.rmq.ack(ctx);
        return d ? { driverId: d.id } : null;
    }
    async assign(payload, ctx) {
        await this.drivers.assign(payload.driverId);
        this.rmq.ack(ctx);
        return { ok: true };
    }
};
exports.DriverMessageController = DriverMessageController;
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.DRIVER.FIND_AVAILABLE),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], DriverMessageController.prototype, "findAvailable", null);
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.DRIVER.ASSIGN),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], DriverMessageController.prototype, "assign", null);
exports.DriverMessageController = DriverMessageController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [driver_service_1.DriverService, common_2.RmqService])
], DriverMessageController);
//# sourceMappingURL=driver.message.controller.js.map