import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

export interface StateFilterProps {
    state: string,
    onChange: (state: SelectChangeEvent<string>) => void,
}

const statesInEnglish = [
    { name: 'Florida', value: 'FL' },
    { name: 'Massachusetts', value: 'MA' },
    { name: 'Connecticut', value: 'CT' },
    { name: 'Massachusetts + Connecticut', value: 'MA, CT' },
];

const StateFilter: React.FC<StateFilterProps> = (props) => {
    const {state: state, onChange} = props;

    return (
        <FormControl margin="normal">
            <InputLabel id="state-select-label">Штат</InputLabel>
            <Select
                labelId="state-select-label"
                value={state}
                onChange={onChange}
                label="State"
            >
                {statesInEnglish.map((stateOption) => (
                    <MenuItem key={stateOption.value} value={stateOption.value}>
                        {stateOption.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default StateFilter;
