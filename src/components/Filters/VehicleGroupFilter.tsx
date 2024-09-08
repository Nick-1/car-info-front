import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

export interface VehicleGroupFilterProps {
    activeGroupId: number,
    groupList: [{ name: string, id: number }],
    onChange: (vehicleGroupId: SelectChangeEvent<number>) => void,
}

const VehicleGroupFilter: React.FC<VehicleGroupFilterProps> = (props) => {
    const {activeGroupId, groupList, onChange} = props;

    return (
        <>
            <FormControl margin="normal">
                <InputLabel id="vehicle-select-label">Машина</InputLabel>
                <Select
                    labelId="vehicle-select-label"
                    value={activeGroupId}
                    onChange={onChange}
                    label="Vehicle"
                >
                    {groupList.map((group) => (
                        <MenuItem key={group.id} value={group.id}>
                            {group.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default VehicleGroupFilter;
