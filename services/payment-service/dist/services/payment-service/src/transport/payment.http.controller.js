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
exports.PaymentHttpController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payment_service_1 = require("../domain/payment.service");
const common_2 = require("@rides/common");
let PaymentHttpController = class PaymentHttpController {
    payments;
    constructor(payments) {
        this.payments = payments;
    }
    authorize(body) {
        return this.payments.authorize(body.tripId, body.passengerId, Number(body.amount));
    }
    capture(body) {
        return this.payments.capture(body.authorizationId);
    }
    release(body) {
        return this.payments.release(body.authorizationId);
    }
};
exports.PaymentHttpController = PaymentHttpController;
__decorate([
    (0, common_1.Post)('authorize'),
    (0, swagger_1.ApiOperation)({ summary: 'Authorize a payment for a trip' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaymentAuthorizeDto]),
    __metadata("design:returntype", void 0)
], PaymentHttpController.prototype, "authorize", null);
__decorate([
    (0, common_1.Post)('capture'),
    (0, swagger_1.ApiOperation)({ summary: 'Capture a payment authorization' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaymentActionDto]),
    __metadata("design:returntype", void 0)
], PaymentHttpController.prototype, "capture", null);
__decorate([
    (0, common_1.Post)('release'),
    (0, swagger_1.ApiOperation)({ summary: 'Release a payment authorization' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaymentActionDto]),
    __metadata("design:returntype", void 0)
], PaymentHttpController.prototype, "release", null);
exports.PaymentHttpController = PaymentHttpController = __decorate([
    (0, swagger_1.ApiTags)('internal'),
    (0, common_1.Controller)('internal/payments'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentHttpController);
//# sourceMappingURL=payment.http.controller.js.map