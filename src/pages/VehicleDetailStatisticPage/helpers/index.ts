import {DailyPricing} from '../../../components/DailyPricing/types';

export function calculateTotalUnavailableDays(data: DailyPricing[], year: number): number {
    return data
        .filter((item) => {
            const itemYear = new Date(item.date).getUTCFullYear();
            return itemYear === year && item.wholeDayUnavailable;
        })
        .reduce((sum, item) => sum + parseFloat(item.price), 0);
}
