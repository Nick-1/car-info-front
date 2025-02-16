import {Image} from './vehicleImage.ts';
import {Vehicle} from './vehicle.ts';

export interface Host {
    id: number;
    firstName: string;
    lastName: string;
    image: Image;
    memberSince: number;
    numberOfRatingsFromCarOwners: 7;
    url: string;
    vehicles: Vehicle[]
}
