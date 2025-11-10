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
exports.DriverHttpController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const driver_service_1 = require("../domain/driver.service");
const common_2 = require("@rides/common");
let DriverHttpController = class DriverHttpController {
    drivers;
    constructor(drivers) {
        this.drivers = drivers;
    }
    available(q) {
        return this.drivers.findAvailableNear(Number(q.lat), Number(q.lng));
    }
    assign(body) {
        return this.drivers.assign(body.driverId).then(() => ({ ok: true }));
    }
};
exports.DriverHttpController = DriverHttpController;
__decorate([
    (0, common_1.Get)('available'),
    (0, swagger_1.ApiOperation)({ summary: 'Find an available driver near coordinates' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.FindDriverDto]),
    __metadata("design:returntype", void 0)
], DriverHttpController.prototype, "available", null);
__decorate([
    (0, common_1.Post)('assign'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark a driver as assigned' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.AssignDriverDto]),
    __metadata("design:returntype", void 0)
], DriverHttpController.prototype, "assign", null);
exports.DriverHttpController = DriverHttpController = __decorate([
    (0, swagger_1.ApiTags)('internal'),
    (0, common_1.Controller)('internal/driver'),
    __metadata("design:paramtypes", [driver_service_1.DriverService])
], DriverHttpController);
//# sourceMappingURL=driver.http.controller.js.map