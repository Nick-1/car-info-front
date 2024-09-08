import React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridColDef,
} from '@mui/x-data-grid';
import { toDailyPricing } from './mappers';
import { generateDaysArray } from './helpers/generate-days-array.ts';
import {DailyPricingRaw} from './types';
import {dataGridStyles, rowSpacingStyle} from './styles.tsx';
import {activeListingColProps, carColProps, dateAndPriceProps} from './renderOptions.tsx';
import './dailyPrising.scss';

export interface DailyPricingProps {
    data: DailyPricingRaw[];
    year: number;
    month: number;
}

const DailyPricingGrid: React.FC<DailyPricingProps> = (props) => {
    const { data, year, month } = props;
    const mappedData = toDailyPricing(data);

    const columns: GridColDef[] = [
        { field: 'car', headerName: 'Модель', ...carColProps },
        { field: 'year', headerName: 'Рік' },
        { field: 'color', headerName: 'Колір' },
        { field: 'listingEnabled', headerName: 'Лістинг активний', ...activeListingColProps },
        { field: 'state', headerName: 'Штат' },
        { field: 'city', headerName: 'Місто' },
        ...generateDaysArray(year, month, dateAndPriceProps),
    ];

    return (
        <Box sx={{
            height: 600,
            width: '100%',
            mt: 3,
            mb: 3,
        }}>
            <DataGrid
                rows={mappedData}
                columns={columns}
                getRowId={(row) => row.id}
                getRowSpacing={(params) => rowSpacingStyle(params)}
                sx={dataGridStyles()}
            />
        </Box>
    );
};

export default DailyPricingGrid;
