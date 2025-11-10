import { Injectable } from '@nestjs/common';
import { EstimatePriceDto, PriceQuoteDto } from '@rides/common';

type ServiceLevel = 'standard' | 'premium' | 'xl';

interface FareRules {
  base: number;
  perKm: number;
  perMinute: number;
  minimum: number;
}

@Injectable()
export class PricingService {
  private readonly config: {
    currency: string;
    averageSpeedKph: number;
    serviceLevels: Record<ServiceLevel, FareRules>;
  } = {
    currency: 'USD',
    averageSpeedKph: 30,
    serviceLevels: {
      standard: { base: 2.5, perKm: 1.25, perMinute: 0.25, minimum: 7 },
      premium: { base: 5, perKm: 2, perMinute: 0.4, minimum: 12 },
      xl: { base: 6, perKm: 2.4, perMinute: 0.45, minimum: 15 },
    },
  };

  estimate(input: EstimatePriceDto): PriceQuoteDto {
    const { pickupLat, pickupLng, dropoffLat, dropoffLng, serviceLevel } = input;
    const level: ServiceLevel = serviceLevel ?? 'standard';
    const rules = this.config.serviceLevels[level];

    const distanceKm = this.distanceBetween(pickupLat, pickupLng, dropoffLat, dropoffLng);
    const durationMinutes = this.estimateDuration(distanceKm);
    const surgeMultiplier = this.surgeMultiplier(distanceKm);

    const distanceComponent = distanceKm * rules.perKm;
    const durationComponent = durationMinutes * rules.perMinute;
    const subtotal = rules.base + distanceComponent + durationComponent;
    const amount = Math.max(rules.minimum, subtotal) * surgeMultiplier;

    return {
      currency: this.config.currency,
      amount: this.round(amount),
      serviceLevel: level,
      surgeMultiplier,
      distanceKm: this.round(distanceKm),
      durationMinutes: Math.max(5, Math.round(durationMinutes)),
      breakdown: {
        base: rules.base,
        distanceComponent: this.round(distanceComponent),
        durationComponent: this.round(durationComponent),
        minimumFare: rules.minimum,
      },
    };
  }

  getConfig() {
    return this.config;
  }

  private distanceBetween(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const toRad = (d: number) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private estimateDuration(distanceKm: number) {
    const minutes = (distanceKm / this.config.averageSpeedKph) * 60;
    return Math.max(5, minutes);
  }

  private surgeMultiplier(distanceKm: number) {
    if (distanceKm > 18) return 1.35;
    if (distanceKm > 10) return 1.15;
    return 1;
  }

  private round(value: number) {
    return Math.round(value * 100) / 100;
  }
}
