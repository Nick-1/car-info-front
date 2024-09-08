import {DailyPricing, DailyPricingRaw} from '../types';
import {GridColDef} from '@mui/x-data-grid';

interface FormattedPricing {
    [key: string]: {
        localizedShortDayOfWeek: string;
        wholeDayUnavailable: boolean;
        price: number;
        custom: boolean;
    };
}

const generateDateAndPriceRows = (data: DailyPricing[]): FormattedPricing => {
    return data.reduce((result: FormattedPricing, item: DailyPricing) => {
        const dateKey = new Date(item.date).getDate();

        result[dateKey] = {
            localizedShortDayOfWeek: item.localizedShortDayOfWeek,
            wholeDayUnavailable: item.wholeDayUnavailable,
            price: parseFloat(item.price),
            custom: item.custom,
        };

        return result;
    }, {});
}

export const generateDayAndPriceColumns = (
    data: DailyPricingRaw[],
    generateDynamicColumnsFunc: (rowName: string) => Partial<GridColDef>
): GridColDef[] => {
    const uniqueResults = new Set<string>();

    return data.flatMap(vehicleData =>
        vehicleData.dailyPricing.map(pricing => {
            const field = pricing.date.split('T')[0];
            const headerName = pricing.date.split('T')[0];
            const key = `${field}-${headerName}`;

            if (!uniqueResults.has(key)) {
                uniqueResults.add(key);

                return {
                    field,
                    headerName,
                    ...generateDynamicColumnsFunc(field),
                };
            }
            return null;
        })
    ).filter(item => item !== null) as GridColDef[];
}

export const toDailyPricing = (dailyPricingRawList: DailyPricingRaw[]) => {
    return dailyPricingRawList.map((dp) => ({
        id: dp.vehicle.id,
        car: {
            name: `${dp.vehicle.make} ${dp.vehicle.model}`,
            url: dp.vehicle.url,
        },
        year: dp.vehicle.year,
        color: dp.vehicle.color,
        listingEnabled: dp.vehicle.listingEnabled,
        state: dp.vehicle.location.state,
        city: dp.vehicle.location.city,
        ...generateDateAndPriceRows(dp.dailyPricing),
    }))
}

export const toAverage = (dailyPricingRawList: DailyPricingRaw[]) => {
    return dailyPricingRawList.map((dp) => ({
        id: dp.vehicle.id,
        average: 'Середня ціна за день',
        unavailableCount: 'Кількість зайнятих машин за день',
        ...generateDateAndPriceRows(dp.dailyPricing),
    }))
}
