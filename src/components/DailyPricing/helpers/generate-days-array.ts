import {GridColDef} from '@mui/x-data-grid';

export const generateDaysArray = (
    year: number,
    month: number,
    generateProperty?: (rowName: string) => Partial<GridColDef>
): GridColDef[] => {
    if (month < 1 || month > 12) {
        throw new Error('month should be between 1 and 12');
    }

    const daysInMonth = new Date(year, month, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, day) => {
        const dayString = (day + 1).toString();

        if (!generateProperty) {
            return {
                field: dayString,
                headerName: dayString,
            }
        }

        return {
            field: dayString,
            headerName: dayString,
            ...generateProperty(dayString)
        };
    });
}
