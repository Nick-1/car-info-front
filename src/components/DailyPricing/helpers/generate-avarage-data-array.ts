import {DailyPricing} from '../types';

export interface ProcessedResult {
    average: { [key: number]: number };
    unavailableCount: { [key: number]: string };
    unavailablePercentage: { [key: number]: string };
}

export function processDailyPricing(data: { dailyPricing: DailyPricing[] }[]): ProcessedResult {
    const result: ProcessedResult = {
        average: {},
        unavailableCount: {},
        unavailablePercentage: {},
    };

    const temp: { [key: number]: { sum: number; count: number; unavailableCount: number } } = {};
    const totalVehicles = data.length;

    data.forEach(item => {
        item.dailyPricing.forEach(pricing => {
            const date = new Date(pricing.date);
            const day = date.getDate();

            if (!temp[day]) {
                temp[day] = {
                    sum: 0,
                    count: 0,
                    unavailableCount: 0,
                };
            }

            temp[day].sum += parseFloat(pricing.price);
            temp[day].count += 1;
            if (pricing.wholeDayUnavailable) {
                temp[day].unavailableCount += 1;
            }
        });
    });

    Object.keys(temp).forEach(day => {
        const dayNumber = parseInt(day, 10);
        const { sum, count, unavailableCount } = temp[dayNumber];

        result.average[dayNumber] = Math.round(sum / count);
        result.unavailableCount[dayNumber] = `${unavailableCount}/${totalVehicles}`;
        result.unavailablePercentage[dayNumber] = ((unavailableCount / totalVehicles) * 100).toFixed(2);
    });

    return result;
}
