import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {CountryCode} from '../../enums/countries.ts';

export interface StateFilterProps {
    country: string,
    state: string,
    onChange: (state: SelectChangeEvent<string>) => void,
}
export const DEFAULT_STATE = 'ALL';

const statesUSA = [
    { name: 'All States', value: DEFAULT_STATE },
    { name: 'Florida', value: 'FL' },
    { name: 'California', value: 'CA' },
    { name: 'New York', value: 'NY' },
];

const statesCanada = [
    { name: 'All States', value: DEFAULT_STATE },
    { name: 'Alberta', value: 'AB' },
    { name: 'British Columbia', value: 'BC' },
    { name: 'Ontario', value: 'ON' },
];

const getStatesByCountry = (countryCode: CountryCode) => {
    switch (countryCode) {
        case CountryCode.US:
            return statesUSA;
        case CountryCode.CA:
            return statesCanada;
        default:
            return statesCanada;
    }
}

const StateFilter: React.FC<StateFilterProps> = (props) => {
    const { country, state, onChange } = props;
    const stateList = getStatesByCountry(country as CountryCode);

    return (
        <FormControl margin="normal">
            <InputLabel id="state-select-label">State</InputLabel>
            <Select
                labelId="state-select-label"
                value={state}
                onChange={onChange}
                label="State"
                defaultValue={''}
            >
                {stateList.map((stateOption) => (
                    <MenuItem key={stateOption.value} value={stateOption.value}>
                        {stateOption.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default StateFilter;
