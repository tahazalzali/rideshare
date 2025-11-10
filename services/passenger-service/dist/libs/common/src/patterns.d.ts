export declare const PATTERNS: {
    readonly PASSENGER: {
        readonly CREATE: "passenger.create";
        readonly GET: "passenger.get";
    };
    readonly DRIVER: {
        readonly FIND_AVAILABLE: "driver.findAvailable";
        readonly ASSIGN: "driver.assign";
    };
    readonly PRICING: {
        readonly ESTIMATE: "pricing.estimate";
    };
    readonly PAYMENT: {
        readonly AUTHORIZE: "payment.authorize";
        readonly CAPTURE: "payment.capture";
        readonly RELEASE: "payment.release";
    };
    readonly TRIP: {
        readonly BOOK: "trip.book";
        readonly GET: "trip.get";
    };
    readonly NOTIFICATION: {
        readonly SEND: "notification.send";
    };
};
