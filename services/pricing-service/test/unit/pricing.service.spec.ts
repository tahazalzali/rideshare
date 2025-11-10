import { PricingService } from '../../src/domain/pricing.service';

describe('PricingService', () => {
  const service = new PricingService();

  it('returns quote with breakdown and metadata', () => {
    const quote = service.estimate({
      pickupLat: 37.7749,
      pickupLng: -122.4194,
      dropoffLat: 37.7849,
      dropoffLng: -122.4094,
    });
    expect(quote.currency).toBe('USD');
    expect(quote.amount).toBeGreaterThan(0);
    expect(quote.breakdown).toMatchObject({
      base: expect.any(Number),
      distanceComponent: expect.any(Number),
      durationComponent: expect.any(Number),
      minimumFare: expect.any(Number),
    });
    expect(quote.distanceKm).toBeGreaterThan(0);
    expect(quote.durationMinutes).toBeGreaterThanOrEqual(5);
  });

  it('supports premium service level', () => {
    const quote = service.estimate({
      pickupLat: 37.7749,
      pickupLng: -122.4194,
      dropoffLat: 37.8049,
      dropoffLng: -122.3994,
      serviceLevel: 'premium',
    });
    expect(quote.serviceLevel).toBe('premium');
    expect(quote.amount).toBeGreaterThan(quote.breakdown?.minimumFare ?? 0);
  });

  it('exposes config for observability', () => {
    const config = service.getConfig();
    expect(config.currency).toBe('USD');
    expect(config.serviceLevels.standard.base).toBeGreaterThan(0);
  });
});
