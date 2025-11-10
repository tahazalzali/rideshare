import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import CircuitBreaker from 'opossum';

@Injectable()
export class HttpCircuitService {
  private readonly client: AxiosInstance;
  private readonly breaker: CircuitBreaker;

  constructor() {
    this.client = axios.create({ timeout: 2000 });
    // Wrap a generic GET call for demonstration; can be extended for POST, etc.
    this.breaker = new CircuitBreaker((url: string, params?: any) => this.client.get(url, { params }).then(r => r.data), {
      timeout: 2500,
      errorThresholdPercentage: 50,
      resetTimeout: 5000,
    });
  }

  async getWithBreaker(url: string, params?: any) {
    return this.breaker.fire(url, params);
  }
}
