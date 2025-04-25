import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

export interface CountryFilterProps {
    country: string,
    onChange: (state: SelectChangeEvent<string>) => void,
}
export const DEFAULT_COUNTRY = 'ALL';

const CountryInEnglish = [
    { name: 'All Countries', value: DEFAULT_COUNTRY },
    { name: 'USA', value: 'US' },
    { name: 'Canada', value: 'CA' },
];

const CountryFilter: React.FC<CountryFilterProps> = (props) => {
    const { country, onChange } = props;

    return (
        <FormControl margin="normal">
            <InputLabel id="country-select-label">State</InputLabel>
            <Select
                labelId="country-select-label"
                value={country}
                onChange={onChange}
                label="Country"
                defaultValue={'USA'}
            >
                {CountryInEnglish.map((countryOption) => (
                    <MenuItem key={countryOption.value} value={countryOption.value}>
                        {countryOption.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CountryFilter;
