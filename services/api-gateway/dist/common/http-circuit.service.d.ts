export declare class HttpCircuitService {
    private readonly client;
    private readonly breaker;
    constructor();
    getWithBreaker(url: string, params?: any): Promise<any>;
}
