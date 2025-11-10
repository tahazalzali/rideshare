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
exports.HttpCircuitService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const opossum_1 = require("opossum");
let HttpCircuitService = class HttpCircuitService {
    client;
    breaker;
    constructor() {
        this.client = axios_1.default.create({ timeout: 2000 });
        this.breaker = new opossum_1.default((url, params) => this.client.get(url, { params }).then(r => r.data), {
            timeout: 2500,
            errorThresholdPercentage: 50,
            resetTimeout: 5000,
        });
    }
    async getWithBreaker(url, params) {
        return this.breaker.fire(url, params);
    }
};
exports.HttpCircuitService = HttpCircuitService;
exports.HttpCircuitService = HttpCircuitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], HttpCircuitService);
//# sourceMappingURL=http-circuit.service.js.map