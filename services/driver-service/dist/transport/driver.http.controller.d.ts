import { DriverService } from '../domain/driver.service';
import { FindDriverDto, AssignDriverDto } from '@rides/common';
export declare class DriverHttpController {
    private drivers;
    constructor(drivers: DriverService);
    available(q: FindDriverDto): Promise<import("../domain/driver.entity").Driver | null>;
    assign(body: AssignDriverDto): Promise<{
        ok: boolean;
    }>;
}
