import React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {DailyPricingRaw} from '../DailyPricing/types';
import {processDailyPricing} from '../DailyPricing/helpers/generate-avarage-data-array.ts';
import {generateDaysArray} from '../DailyPricing/helpers/generate-days-array.ts';
import {dataGridStyles, rowSpacingStyle} from './styles.tsx';
import {itemColProps, renderCellParams} from './renderOptions.tsx';

export interface AverageGridProps {
    data: DailyPricingRaw[];
    year: number;
    month: number;
}

const AverageGrid: React.FC<AverageGridProps> = (props) => {
    const {data, year, month} = props;
    const averageData = processDailyPricing(data);

    const columns: GridColDef[] = [
        { field: 'item', headerName: 'Показник', ...itemColProps },
        ...generateDaysArray(year, month, renderCellParams),
    ];

    const rows = [
        {
            id: 1,
            item: {
                name: 'Середня ціна за день'
            },
            ...averageData.average
        },
        {
            id: 3,
            item: {
                name: 'Відсоток зайнятих машин'
            },
            ...averageData.unavailablePercentage,
        },
        {
            id: 2,
            item: {
                name: 'Кількість зайнятих машин'
            },
            ...averageData.unavailableCount
        },
    ]

   return (
       <Box sx={{
           height: 300,
           width: '100%',
           mt: 3,
           mb: 3,
       }}>
           <DataGrid
               rows={rows}
               columns={columns}
               getRowId={(row) => row.id}
               getRowSpacing={(params) => rowSpacingStyle(params)}
               sx={dataGridStyles()}
           />
       </Box>
   )
}

export default AverageGrid;
