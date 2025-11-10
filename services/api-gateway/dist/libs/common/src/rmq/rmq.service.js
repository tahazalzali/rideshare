"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RmqService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RmqService = void 0;
const common_1 = require("@nestjs/common");
let RmqService = RmqService_1 = class RmqService {
    logger = new common_1.Logger(RmqService_1.name);
    ack(context) {
        try {
            const channel = context.getChannelRef();
            const originalMsg = context.getMessage();
            channel.ack(originalMsg);
        }
        catch (e) {
            this.logger.error('Failed to ack message', e);
        }
    }
};
exports.RmqService = RmqService;
exports.RmqService = RmqService = RmqService_1 = __decorate([
    (0, common_1.Injectable)()
], RmqService);
//# sourceMappingURL=rmq.service.js.map