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
var NotificationMessageController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationMessageController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@rides/common");
let NotificationMessageController = NotificationMessageController_1 = class NotificationMessageController {
    rmq;
    logger = new common_1.Logger(NotificationMessageController_1.name);
    constructor(rmq) {
        this.rmq = rmq;
    }
    async send(payload, ctx) {
        this.logger.log(`Notify: ${JSON.stringify(payload)}`);
        this.rmq.ack(ctx);
        return { ok: true };
    }
};
exports.NotificationMessageController = NotificationMessageController;
__decorate([
    (0, microservices_1.MessagePattern)(common_2.PATTERNS.NOTIFICATION.SEND),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, microservices_1.RmqContext]),
    __metadata("design:returntype", Promise)
], NotificationMessageController.prototype, "send", null);
exports.NotificationMessageController = NotificationMessageController = NotificationMessageController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [common_2.RmqService])
], NotificationMessageController);
//# sourceMappingURL=notification.message.controller.js.map