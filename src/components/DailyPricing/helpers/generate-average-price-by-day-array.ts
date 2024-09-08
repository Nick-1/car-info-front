import {DailyPricing} from '../types';

export function generateAveragePriceByDayArray(
    data: { dailyPricing: DailyPricing[] }[],
    year: number,
    month: number,
): number[] {
    // Визначаємо кількість днів у конкретному місяці
    const daysInMonth = new Date(year, month, 0).getDate();

    // Створюємо об'єкт для зберігання сум і кількостей по днях
    const temp: { [key: number]: { sum: number; count: number } } = {};

    // Заповнюємо дані з вхідного масиву
    data.forEach(item => {
        item.dailyPricing.forEach(pricing => {
            const date = new Date(pricing.date);
            const day = date.getDate();
            const pricingYear = date.getFullYear();
            const pricingMonth = date.getMonth() + 1; // +1, щоб місяці відповідали реальним значенням (1-12)

            // Перевіряємо, чи ціна відповідає переданому місяцю та року
            if (pricingYear === year && pricingMonth === month) {
                if (!temp[day]) {
                    temp[day] = {
                        sum: 0,
                        count: 0,
                    };
                }

                temp[day].sum += parseFloat(pricing.price);
                temp[day].count += 1;
            }
        });
    });

    // Формування масиву середніх цін за дні місяця
    const averagePrices: number[] = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        if (temp[day]) {
            const { sum, count } = temp[day];
            return Math.round(sum / count); // Округлюємо до найближчого цілого
        }
        return 0; // Якщо даних за день немає, повертаємо 0
    });

    return averagePrices;
}
