import {DailyPricing} from '../../../components/DailyPricing/types';

interface OutputData {
    month: string;
    earned: number;
    averagePrice: number;
    minPrice: number;
    maxPrice: number;
    availableCount: string;
}

export function mapData(input: DailyPricing[], year: number): OutputData[] {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const filteredData = input.filter((item) => {
        const date = new Date(item.date);
        return date.getUTCFullYear() === year;
    });

    const groupedData: { [key: number]: DailyPricing[] } = filteredData.reduce((acc, item) => {
        const date = new Date(item.date);
        const month = date.getUTCMonth(); // Отримуємо місяць (0-11)
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(item);
        return acc;
    }, {} as { [key: number]: DailyPricing[] });

    const result: OutputData[] = Object.keys(groupedData).map((monthKey) => {
        const month = Number(monthKey);
        const data = groupedData[month];

        const earned = data
            .filter((item) => item.wholeDayUnavailable)
            .reduce((sum, item) => sum + Number(item.price), 0);

        const prices = data.map((item) => Number(item.price));
        const averagePrice = Math.ceil(prices.reduce((sum, price) => sum + price, 0) / prices.length);
        const minPrice = Math.ceil(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));

        const daysWithUnavailable = data.filter((item) => item.wholeDayUnavailable).length;
        const totalDaysInMonth = new Date(year, month + 1, 0).getUTCDate();
        const availableCount = `${daysWithUnavailable}/${totalDaysInMonth}`;

        return {
            id: monthNames[month],
            month: monthNames[month],
            earned,
            averagePrice,
            minPrice,
            maxPrice,
            availableCount,
        };
    });

    return result;
}
