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
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@rides/common");
const http_circuit_service_1 = require("../common/http-circuit.service");
let PricingController = class PricingController {
    http;
    constructor(http) {
        this.http = http;
    }
    async estimate(q) {
        const url = process.env.PRICING_HTTP_URL || 'http://pricing-service:3011/internal/estimate';
        return this.http.getWithBreaker(url, q);
    }
};
exports.PricingController = PricingController;
__decorate([
    (0, common_1.Get)('estimate'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.EstimatePriceDto]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "estimate", null);
exports.PricingController = PricingController = __decorate([
    (0, swagger_1.ApiTags)('pricing'),
    (0, common_1.Controller)({ path: 'v1/pricing' }),
    __metadata("design:paramtypes", [http_circuit_service_1.HttpCircuitService])
], PricingController);
//# sourceMappingURL=pricing.controller.js.map