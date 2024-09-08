import {Vehicle} from '../../../interfaces/vehicle.ts';

export interface DailyPricingRaw {
    vehicle: Vehicle,
    dailyPricing: DailyPricing[];
}

export interface DailyPricing {
    custom: boolean;
    source: string;
    date: string,
    localizedShortDayOfWeek: string,
    wholeDayUnavailable: boolean;
    price: string;
    priceEditable: boolean;
    vehicleId: number;
}
