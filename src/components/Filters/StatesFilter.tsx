import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

export interface StateFilterProps {
    state: string,
    onChange: (state: SelectChangeEvent<string>) => void,
}
export const DEFAULT_STATE = 'ALL';

const statesInEnglish = [
    { name: 'All States', value: DEFAULT_STATE },
    { name: 'Florida', value: 'FL' },
    { name: 'California', value: 'CA' },
    { name: 'New York', value: 'NY' },
];

const StateFilter: React.FC<StateFilterProps> = (props) => {
    const {state: state, onChange } = props;

    return (
        <FormControl margin="normal">
            <InputLabel id="state-select-label">State</InputLabel>
            <Select
                labelId="state-select-label"
                value={state}
                onChange={onChange}
                label="State"
                defaultValue={'CA'}
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
