export const PATTERNS = {
  PASSENGER: {
    CREATE: 'passenger.create',
    GET: 'passenger.get',
    LIST: 'passenger.list',
  },
  DRIVER: {
    FIND_AVAILABLE: 'driver.findAvailable',
    ASSIGN: 'driver.assign',
    CREATE: 'driver.create',
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
    START: 'trip.start',
    COMPLETE: 'trip.complete',
    CANCEL: 'trip.cancel',
  },
  NOTIFICATION: {
    SEND: 'notification.send',
  },
} as const;
