import { ClientProxy } from '@nestjs/microservices';
import { TripStatusDto, BookTripDto } from '@rides/common';
export declare class TripController {
    private readonly tripClient;
    constructor(tripClient: ClientProxy);
    book(dto: BookTripDto): Promise<TripStatusDto>;
    get(id: string): Promise<TripStatusDto>;
}
