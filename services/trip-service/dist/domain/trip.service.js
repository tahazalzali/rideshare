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
var TripService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const common_2 = require("@rides/common");
const trip_repository_1 = require("../infra/trip.repository");
let TripService = TripService_1 = class TripService {
    repo;
    pricing;
    payment;
    driver;
    logger = new common_1.Logger(TripService_1.name);
    constructor(repo, pricing, payment, driver) {
        this.repo = repo;
        this.pricing = pricing;
        this.payment = payment;
        this.driver = driver;
    }
    async book(payload) {
        let trip = await this.repo.save({
            passengerId: payload.passengerId,
            pickupLat: payload.pickupLat, pickupLng: payload.pickupLng,
            dropoffLat: payload.dropoffLat, dropoffLng: payload.dropoffLng,
            status: 'REQUESTED', currency: 'USD', price: 0,
        });
        const quote = await (0, rxjs_1.firstValueFrom)(this.pricing.send(common_2.PATTERNS.PRICING.ESTIMATE, payload).pipe((0, rxjs_1.timeout)(5000)));
        trip.price = quote.amount;
        trip.currency = quote.currency;
        trip.status = 'PRICED';
        trip = await this.repo.save(trip);
        const auth = await (0, rxjs_1.firstValueFrom)(this.payment
            .send(common_2.PATTERNS.PAYMENT.AUTHORIZE, {
            tripId: trip.id,
            passengerId: payload.passengerId,
            amount: trip.price,
        })
            .pipe((0, rxjs_1.timeout)(5000)));
        trip.paymentAuthId = auth.authorizationId;
        trip.status = 'AUTHORIZED';
        trip = await this.repo.save(trip);
        const driver = await (0, rxjs_1.firstValueFrom)(this.driver
            .send(common_2.PATTERNS.DRIVER.FIND_AVAILABLE, {
            lat: payload.pickupLat,
            lng: payload.pickupLng,
        })
            .pipe((0, rxjs_1.timeout)(5000)));
        if (!driver) {
            await (0, rxjs_1.firstValueFrom)(this.payment
                .send(common_2.PATTERNS.PAYMENT.RELEASE, { authorizationId: trip.paymentAuthId })
                .pipe((0, rxjs_1.timeout)(5000)));
            trip.status = 'CANCELLED';
            return this.repo.save(trip);
        }
        await (0, rxjs_1.firstValueFrom)(this.driver.send(common_2.PATTERNS.DRIVER.ASSIGN, { driverId: driver.driverId }).pipe((0, rxjs_1.timeout)(5000)));
        trip.driverId = driver.driverId;
        trip.status = 'DRIVER_ASSIGNED';
        return this.repo.save(trip);
    }
    async get(id) {
        return this.repo.findById(id);
    }
};
exports.TripService = TripService;
exports.TripService = TripService = TripService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('PRICING')),
    __param(2, (0, common_1.Inject)('PAYMENT')),
    __param(3, (0, common_1.Inject)('DRIVER')),
    __metadata("design:paramtypes", [trip_repository_1.TripRepository,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], TripService);
//# sourceMappingURL=trip.service.js.map