"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATTERNS = void 0;
exports.PATTERNS = {
    PASSENGER: {
        CREATE: 'passenger.create',
        GET: 'passenger.get',
    },
    DRIVER: {
        FIND_AVAILABLE: 'driver.findAvailable',
        ASSIGN: 'driver.assign',
    },
    PRICING: {
        ESTIMATE: 'pricing.estimate',
    },
    PAYMENT: {
        AUTHORIZE: 'payment.authorize',
        CAPTURE: 'payment.capture',
        RELEASE: 'payment.release',
    },
    TRIP: {
        BOOK: 'trip.book',
        GET: 'trip.get',
    },
    NOTIFICATION: {
        SEND: 'notification.send',
    },
};
//# sourceMappingURL=patterns.js.map