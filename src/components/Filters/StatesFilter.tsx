import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

export interface StateFilterProps {
    state: string,
    onChange: (state: SelectChangeEvent<string>) => void,
}

const StateFilter: React.FC<StateFilterProps> = (props) => {
    const {state: state, onChange} = props;

    const statesInUkrainian = [
        { name: 'Флоріда', value: 'FL' },
        { name: 'Массачусетс', value: 'MA' },
        { name: 'Коннектикут', value: 'CT' },
        { name: 'Массачусетс + Коннектикут', value: 'MA, CT' },
    ];

    return (
        <FormControl margin="normal">
            <InputLabel id="state-select-label">Штат</InputLabel>
            <Select
                labelId="state-select-label"
                value={state}
                onChange={onChange}
                label="State"
            >
                {statesInUkrainian.map((stateOption) => (
                    <MenuItem key={stateOption.value} value={stateOption.value}>
                        {stateOption.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default StateFilter;
