import {VehicleStatistic} from '../../../components/VehiclesStatisticTable';

export function toGridRows(
    list: VehicleStatistic[]): any {

    return list
        .map((item) => {
            return {
            id: item.vehicle.id,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            photo: item.vehicle.images[0].thumbnails['170x102'],
            carYear: item.vehicle.year,
            car: `${item.vehicle.make} ${item.vehicle.model}`,
            url: item.vehicle.url,
            earned: item.statistic.earned,
            avgPrice: item.statistic.avgPrice,
            minPrice: item.statistic.minPrice,
            maxPrice: item.statistic.maxPrice,
            availableCount: item.statistic.availableCount,
            listingAvailable: item.vehicle.listingEnabled,
        }
    })
}
