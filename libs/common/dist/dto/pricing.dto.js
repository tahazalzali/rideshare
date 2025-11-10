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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceQuoteDto = exports.PriceBreakdownDto = exports.EstimatePriceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class EstimatePriceDto {
    pickupLat;
    pickupLng;
    dropoffLat;
    dropoffLng;
    serviceLevel;
}
exports.EstimatePriceDto = EstimatePriceDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EstimatePriceDto.prototype, "pickupLat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EstimatePriceDto.prototype, "pickupLng", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EstimatePriceDto.prototype, "dropoffLat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EstimatePriceDto.prototype, "dropoffLng", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['standard', 'premium', 'xl'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['standard', 'premium', 'xl']),
    __metadata("design:type", String)
], EstimatePriceDto.prototype, "serviceLevel", void 0);
class PriceBreakdownDto {
    base;
    distanceComponent;
    durationComponent;
    minimumFare;
}
exports.PriceBreakdownDto = PriceBreakdownDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PriceBreakdownDto.prototype, "base", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PriceBreakdownDto.prototype, "distanceComponent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PriceBreakdownDto.prototype, "durationComponent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PriceBreakdownDto.prototype, "minimumFare", void 0);
class PriceQuoteDto {
    currency;
    amount;
    serviceLevel;
    surgeMultiplier;
    distanceKm;
    durationMinutes;
    breakdown;
}
exports.PriceQuoteDto = PriceQuoteDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PriceQuoteDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PriceQuoteDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], PriceQuoteDto.prototype, "serviceLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], PriceQuoteDto.prototype, "surgeMultiplier", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], PriceQuoteDto.prototype, "distanceKm", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], PriceQuoteDto.prototype, "durationMinutes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fare breakdown with the values that compose the quote',
        type: () => PriceBreakdownDto,
    }),
    __metadata("design:type", PriceBreakdownDto)
], PriceQuoteDto.prototype, "breakdown", void 0);
//# sourceMappingURL=pricing.dto.js.map