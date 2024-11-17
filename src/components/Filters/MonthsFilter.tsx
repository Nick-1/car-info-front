import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

export interface MonthFilterProps {
    month: number,
    onChange: (vehicleGroupId: SelectChangeEvent<number>) => void,
}

const monthsInEnglish = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
];

const MonthsFilter: React.FC<MonthFilterProps> = (props) => {
    const {month, onChange} = props;

    return (
        <FormControl margin="normal">
            <InputLabel id="month-select-label">Month</InputLabel>
            <Select
                labelId="month-select-label"
                value={month}
                onChange={onChange}
                label="Month"
            >
                {monthsInEnglish.map((monthOption) => (
                    <MenuItem key={monthOption.value} value={monthOption.value}>
                        {monthOption.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MonthsFilter;
