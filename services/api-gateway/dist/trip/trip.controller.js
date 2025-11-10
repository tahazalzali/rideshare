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
exports.TripController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@rides/common");
const rxjs_1 = require("rxjs");
const passport_1 = require("@nestjs/passport");
const common_3 = require("@rides/common");
const common_4 = require("@rides/common");
let TripController = class TripController {
    tripClient;
    constructor(tripClient) {
        this.tripClient = tripClient;
    }
    async book(dto) {
        const result$ = this.tripClient.send(common_2.PATTERNS.TRIP.BOOK, dto).pipe((0, rxjs_1.timeout)(8000));
        return (0, rxjs_1.firstValueFrom)(result$);
    }
    async get(id) {
        const result$ = this.tripClient.send(common_2.PATTERNS.TRIP.GET, id).pipe((0, rxjs_1.timeout)(5000));
        return (0, rxjs_1.firstValueFrom)(result$);
    }
};
exports.TripController = TripController;
__decorate([
    (0, common_1.Post)(),
    (0, common_3.Roles)('Passenger'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.BookTripDto]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "book", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_3.Roles)('Passenger', 'Driver', 'Admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "get", null);
exports.TripController = TripController = __decorate([
    (0, swagger_1.ApiTags)('trips'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), common_4.RolesGuard),
    (0, common_1.Controller)({ path: 'v1/trips' }),
    __param(0, (0, common_1.Inject)('TRIP')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], TripController);
//# sourceMappingURL=trip.controller.js.map