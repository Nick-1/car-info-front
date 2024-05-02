import {Image} from "../../interfaces/vehicleImage.ts";

export interface VehicleDto {
  id: number;
  make: string,
  model: string,
  year: number,
  color: string,
  url: string,
  images: Image[],
  listingEnabled: boolean,
  listingDeleted: boolean,
  tripCount: number,
  numberOfFavorites: number,
  numberOfReviews: number,
  days_unavailable: number,
  history_prices: HistoryPrice[],
  isMyCar: boolean,
  location: Location,
  freeDeliveryPeriodDescription: string,
}

export interface HistoryPrice {
  defaultPrice: number,
  deliveryPrice: number,
  minDaysForDiscount: number,
  dailyDiscount: number,
  weeklyDiscount: number
  monthlyDiscount: number,
  createdAt: string,
}

export interface Location {
  address: string;
  state: string;
  timeZone: string;
  latitude: number;
  longitude: number;
}

export interface VehicleGrid {
  id: number,
  photo: string | null | undefined,
  car: { name: string, url: string | null },
  year: number,
  price: number,
  dayPrice: { price: number, discount: number },
  weekPrice: { price: number, discount: number },
  monthPrice: { price: number, discount: number },
  deliveryPrice: { price: number, freeIf: string },
  notAvailable: number,
  activeListing: boolean,
  color: string,
  tripCount: number,
  numberOfFavorites: number,
  numberOfReviews: number,
  isMyCar: boolean,
  state: string,
}

export const toVehicleGrid = (vehiclesDto: VehicleDto[]): VehicleGrid[] => {
 return vehiclesDto.map(vehicleDto => {
   const lastHistoryPrice = vehicleDto.history_prices[0];

   return {
     id: vehicleDto.id,
     photo: vehicleDto.images[0].originalImageUrl,
     car: { name: `${vehicleDto.make} ${vehicleDto.model}`, url: vehicleDto.url },
     year: vehicleDto.year,
     price:  Math.round(lastHistoryPrice.defaultPrice),
     dayPrice: { price: calculateDiscountedPrice(lastHistoryPrice.defaultPrice, lastHistoryPrice.dailyDiscount), discount: lastHistoryPrice.dailyDiscount },
     weekPrice: { price: calculateDiscountedPrice(lastHistoryPrice.defaultPrice, lastHistoryPrice.weeklyDiscount), discount: lastHistoryPrice.weeklyDiscount},
     monthPrice: { price: calculateDiscountedPrice(lastHistoryPrice.defaultPrice, lastHistoryPrice.monthlyDiscount), discount: lastHistoryPrice.monthlyDiscount},
     deliveryPrice: { price: lastHistoryPrice.deliveryPrice, freeIf: vehicleDto.freeDeliveryPeriodDescription },
     notAvailable: vehicleDto.days_unavailable,
     activeListing: vehicleDto.listingEnabled,
     color: vehicleDto.color,
     tripCount: vehicleDto.tripCount,
     numberOfFavorites: vehicleDto.numberOfFavorites,
     numberOfReviews: vehicleDto.numberOfReviews,
     isMyCar: vehicleDto.isMyCar,
     state: vehicleDto.location.state,
   }
 })
}

function calculateDiscountedPrice(price: number, discountPercentage: number): number {
  if (discountPercentage < 0 || discountPercentage > 100) {
    return Math.round(price);
  }

  return Math.round(price * (1 - discountPercentage / 100));
}
