export function generateDaysInMonthArray(month: number, year: number): number[] {
    // Місяці в JavaScript починаються з 0 (січень) до 11 (грудень),
    // тому зменшуємо значення місяця на 1
    const days: number[] = [];
    const date = new Date(year, month - 1, 1); // Створюємо перший день місяця

    // Перевіряємо поки місяць дати відповідає заданому місяцю
    while (date.getMonth() === month - 1) {
        days.push(date.getDate()); // Додаємо день в масив
        date.setDate(date.getDate() + 1); // Переходимо до наступного дня
    }

    return days;
}
