import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

export interface MonthFilterProps {
    month: number,
    onChange: (vehicleGroupId: SelectChangeEvent<number>) => void,
}

const MonthsFilter: React.FC<MonthFilterProps> = (props) => {
    const {month, onChange} = props;

    const monthsInUkrainian = [
        { name: 'Січень', value: 1 },
        { name: 'Лютий', value: 2 },
        { name: 'Березень', value: 3 },
        { name: 'Квітень', value: 4 },
        { name: 'Травень', value: 5 },
        { name: 'Червень', value: 6 },
        { name: 'Липень', value: 7 },
        { name: 'Серпень', value: 8 },
        { name: 'Вересень', value: 9 },
        { name: 'Жовтень', value: 10 },
        { name: 'Листопад', value: 11 },
        { name: 'Грудень', value: 12 },
    ];

    return (
        <FormControl margin="normal">
            <InputLabel id="month-select-label">Місяць</InputLabel>
            <Select
                labelId="month-select-label"
                value={month}
                onChange={onChange}
                label="Month"
            >
                {monthsInUkrainian.map((monthOption) => (
                    <MenuItem key={monthOption.value} value={monthOption.value}>
                        {monthOption.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MonthsFilter;
