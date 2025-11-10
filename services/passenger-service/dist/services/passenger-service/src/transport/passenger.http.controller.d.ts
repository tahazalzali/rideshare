import { PassengerService } from '../domain/passenger.service';
export declare class PassengerHttpController {
    private passengers;
    constructor(passengers: PassengerService);
    create(body: {
        name: string;
        email: string;
    }): Promise<import("../domain/passenger.entity").Passenger>;
}
