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
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@rides/common");
const rxjs_1 = require("rxjs");
let PricingHttpController = class PricingHttpController {
    pricing;
    constructor(pricing) {
        this.pricing = pricing;
    }
    async estimate(dto) {
        return (0, rxjs_1.lastValueFrom)(this.pricing.send(common_2.PATTERNS.PRICING.ESTIMATE, dto));
    }
};
exports.PricingHttpController = PricingHttpController;
__decorate([
    (0, common_1.Get)('estimate'),
    (0, swagger_1.ApiOperation)({ summary: 'Estimate ride price based on pickup and dropoff coordinates' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Price estimate', type: common_2.PriceQuoteDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.EstimatePriceDto]),
    __metadata("design:returntype", Promise)
], PricingHttpController.prototype, "estimate", null);
exports.PricingHttpController = PricingHttpController = __decorate([
    (0, swagger_1.ApiTags)('pricing'),
    (0, common_1.Controller)('pricing'),
    __param(0, (0, common_1.Inject)('PRICING')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], PricingHttpController);
//# sourceMappingURL=pricing.controller.js.map