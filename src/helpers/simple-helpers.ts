export const toCamelCase = (str: string): string => {
    return str
        .replace(/-./g, match => match.charAt(1).toUpperCase())
        .replace(/-/g, '');
};

export function formatDateFromIsoToString(isoDateString: number | undefined): string {
    if (!isoDateString) {
        return '-'
    }

    const date = new Date(isoDateString);

    return date.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export function formatMonthYear(month: number, year: number): string {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    if (month < 1 || month > 12) {
        throw new Error("Month must be between 1 and 12");
    }

    return `${months[month - 1]} ${year}`;
}
