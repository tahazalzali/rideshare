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
exports.PricingController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@rides/common");
const pricing_service_1 = require("../domain/pricing.service");
let PricingController = class PricingController {
    pricing;
    rmq;
    constructor(pricing, rmq) {
        this.pricing = pricing;
        this.rmq = rmq;
    }
    async estimate(payload, ctx) {
        const { pickupLat, pickupLng, dropoffLat, dropoffLng } = payload;
        const quote = this.pricing.estimate(pickupLat, pickupLng, dropoffLat, dropoffLng);
        this.rmq.ack(ctx);
        return quote;
    }
};
exports.PricingController = PricingController;
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.PRICING.ESTIMATE),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "estimate", null);
exports.PricingController = PricingController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [pricing_service_1.PricingService, common_2.RmqService])
], PricingController);
//# sourceMappingURL=pricing.message.controller.js.map