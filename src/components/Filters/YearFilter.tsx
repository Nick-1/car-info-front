import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

export interface YearFilterProps {
    year: number,
    onChange: (vehicleGroupId: SelectChangeEvent<number>) => void,
}

const YearFilter: React.FC<YearFilterProps> = (props) => {
    const {year, onChange} = props;

    const generateYears = (): number[] => {
        const years = [];
        const currentYear = new Date().getFullYear();

        for (let year = 2024; year <= currentYear + 1; year++) {
            years.push(year);
        }

        return years;
    };

    return (
        <FormControl margin="normal">
            <InputLabel id="year-select-label">Рік</InputLabel>
            <Select
                labelId="year-select-label"
                value={year}
                onChange={onChange}
                label="Year"
            >
                {generateYears().map((year) => (
                    <MenuItem key={year} value={year}>
                        {year}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default YearFilter;
