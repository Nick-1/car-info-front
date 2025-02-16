import {Image} from './vehicleImage.ts';

export interface Location {
    address: string;
    state: string;
    timeZone: string;
    latitude: number;
    longitude: number;
    city: string;
}

export interface Vehicle {
    id: number;
    name?: string;
    image?: Image;
    images?: Image[];
    color: string | null;
    automaticTransmission: boolean;
    listingEnabled: boolean;
    listingCreatedTime: number;
    tripCount: number;
    make: string;
    model: string;
    marketAreaId: number | null;
    marketCountry: string;
    marketCurrency: string;
    registration: string | null;
    location: Location,
    trim: string | null;
    type: string;
    url: string | null;
    vin: string | null;
    year: number;
}
