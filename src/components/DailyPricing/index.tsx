import React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridColDef, GridRenderCellParams,
} from '@mui/x-data-grid';
import { toDailyPricing } from './mappers';
import { generateDaysArray } from './helpers/generate-days-array.ts';
import {DailyPricingRaw} from './types';
import {dataGridStyles, rowSpacingStyle} from './styles.tsx';
import {activeListingColProps, carColProps, dateAndPriceProps} from './renderOptions.tsx';
import './dailyPrising.scss';
import {Avatar, Link} from '@mui/material';

export interface DailyPricingProps {
    data: DailyPricingRaw[];
    year: number;
    month: number;
}

const photoColProps = {
    width: 90,
    renderCell: (params: GridRenderCellParams) => {
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}>
                <Link href={`/vehicle/${params.row.id}`} target="_blank" rel="noopener noreferrer">
                    <Avatar src={params.row.photo} />
                </Link>
            </Box>
        )
    },
    sortable: false,
    filterable: false,
}

const DailyPricingGrid: React.FC<DailyPricingProps> = (props) => {
    const { data, year, month } = props;
    const mappedData = toDailyPricing(data);

    const columns: GridColDef[] = [
        { field: 'photo', headerName: 'Photo', ...photoColProps },
        { field: 'car', headerName: 'Model', ...carColProps },
        { field: 'year', headerName: 'Year' },
        { field: 'color', headerName: 'Color' },
        { field: 'listingEnabled', headerName: 'Listing Enabled', ...activeListingColProps },
        { field: 'state', headerName: 'State' },
        { field: 'city', headerName: 'City' },
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
