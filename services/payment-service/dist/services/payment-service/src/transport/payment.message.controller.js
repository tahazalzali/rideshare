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
exports.PaymentMessageController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@rides/common");
const payment_service_1 = require("../domain/payment.service");
let PaymentMessageController = class PaymentMessageController {
    payments;
    rmq;
    constructor(payments, rmq) {
        this.payments = payments;
        this.rmq = rmq;
    }
    async authorize(payload, ctx) {
        const auth = await this.payments.authorize(payload.tripId, payload.passengerId, payload.amount);
        this.rmq.ack(ctx);
        return { authorizationId: auth.id, status: auth.status };
    }
    async capture(payload, ctx) {
        const res = await this.payments.capture(payload.authorizationId);
        this.rmq.ack(ctx);
        return res;
    }
    async release(payload, ctx) {
        const res = await this.payments.release(payload.authorizationId);
        this.rmq.ack(ctx);
        return res;
    }
};
exports.PaymentMessageController = PaymentMessageController;
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.PAYMENT.AUTHORIZE),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], PaymentMessageController.prototype, "authorize", null);
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.PAYMENT.CAPTURE),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], PaymentMessageController.prototype, "capture", null);
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.PAYMENT.RELEASE),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], PaymentMessageController.prototype, "release", null);
exports.PaymentMessageController = PaymentMessageController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [payment_service_1.PaymentService, common_2.RmqService])
], PaymentMessageController);
//# sourceMappingURL=payment.message.controller.js.map