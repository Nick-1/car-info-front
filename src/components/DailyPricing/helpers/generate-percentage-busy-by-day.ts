import {DailyPricing} from '../types';

export function getUnavailablePercentage(data: { dailyPricing: DailyPricing[] }[], year: number, month: number): number[] {
    // Визначаємо кількість днів у конкретному місяці
    const daysInMonth = new Date(year, month, 0).getDate();

    // Створюємо об'єкт для зберігання зайнятих машин по днях
    const temp: { [key: number]: { unavailableCount: number } } = {};

    // Загальна кількість машин у масиві
    const totalVehicles = data.length;

    // Заповнюємо дані з вхідного масиву
    data.forEach(item => {
        item.dailyPricing.forEach(pricing => {
            const date = new Date(pricing.date);
            const day = date.getDate(); // Використовуємо локальну дату
            const pricingYear = date.getFullYear(); // Використовуємо локальний рік
            const pricingMonth = date.getMonth() + 1; // Використовуємо локальний місяць (+1 для відповідності формату 1-12)

            // Перевіряємо, чи ціна відповідає переданому місяцю та року
            if (pricingYear === year && pricingMonth === month) {
                if (!temp[day]) {
                    temp[day] = {
                        unavailableCount: 0,
                    };
                }

                if (pricing.wholeDayUnavailable) {
                    temp[day].unavailableCount += 1;
                }
            }
        });
    });

    // Формування масиву відсотків зайнятих машин за дні місяця
    const unavailablePercentages: number[] = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        if (temp[day]) {
            const { unavailableCount } = temp[day];
            return parseFloat(((unavailableCount / totalVehicles) * 100).toFixed(2)); // Розрахунок відсотка та округлення до двох знаків
        }
        return 0; // Якщо даних за день немає, повертаємо 0
    });

    return unavailablePercentages;
}
