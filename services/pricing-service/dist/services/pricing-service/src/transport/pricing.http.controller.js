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
exports.PricingHttpController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pricing_service_1 = require("../domain/pricing.service");
const common_2 = require("@rides/common");
let PricingHttpController = class PricingHttpController {
    pricing;
    constructor(pricing) {
        this.pricing = pricing;
    }
    estimate(q) {
        return this.pricing.estimate(Number(q.pickupLat), Number(q.pickupLng), Number(q.dropoffLat), Number(q.dropoffLng));
    }
};
exports.PricingHttpController = PricingHttpController;
__decorate([
    (0, common_1.Get)('estimate'),
    (0, swagger_1.ApiOperation)({ summary: 'Estimate ride price based on pickup and dropoff coordinates' }),
    (0, swagger_1.ApiQuery)({ name: 'pickupLat', type: Number, description: 'Pickup latitude', example: 37.77 }),
    (0, swagger_1.ApiQuery)({ name: 'pickupLng', type: Number, description: 'Pickup longitude', example: -122.42 }),
    (0, swagger_1.ApiQuery)({ name: 'dropoffLat', type: Number, description: 'Dropoff latitude', example: 37.78 }),
    (0, swagger_1.ApiQuery)({ name: 'dropoffLng', type: Number, description: 'Dropoff longitude', example: -122.41 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Price estimate calculated successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.EstimatePriceDto]),
    __metadata("design:returntype", void 0)
], PricingHttpController.prototype, "estimate", null);
exports.PricingHttpController = PricingHttpController = __decorate([
    (0, swagger_1.ApiTags)('internal'),
    (0, common_1.Controller)('internal'),
    __metadata("design:paramtypes", [pricing_service_1.PricingService])
], PricingHttpController);
//# sourceMappingURL=pricing.http.controller.js.map