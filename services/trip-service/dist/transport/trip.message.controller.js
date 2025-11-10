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
exports.TripMessageController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@rides/common");
const trip_service_1 = require("../domain/trip.service");
let TripMessageController = class TripMessageController {
    trips;
    rmq;
    constructor(trips, rmq) {
        this.trips = trips;
        this.rmq = rmq;
    }
    async book(payload, ctx) {
        const trip = await this.trips.book(payload);
        this.rmq.ack(ctx);
        return {
            id: trip.id,
            status: trip.status,
            price: trip.price,
            currency: trip.currency,
            driverId: trip.driverId,
            paymentAuthId: trip.paymentAuthId,
        };
    }
    async get(id, ctx) {
        const trip = await this.trips.get(id);
        this.rmq.ack(ctx);
        if (!trip)
            return null;
        return {
            id: trip.id,
            status: trip.status,
            price: trip.price,
            currency: trip.currency,
            driverId: trip.driverId,
            paymentAuthId: trip.paymentAuthId,
        };
    }
};
exports.TripMessageController = TripMessageController;
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.TRIP.BOOK),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], TripMessageController.prototype, "book", null);
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.TRIP.GET),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], TripMessageController.prototype, "get", null);
exports.TripMessageController = TripMessageController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [trip_service_1.TripService, common_2.RmqService])
], TripMessageController);
//# sourceMappingURL=trip.message.controller.js.map