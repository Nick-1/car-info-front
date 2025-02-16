import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
    Avatar,
    Link,
    SelectChangeEvent,
} from '@mui/material';
import Box from '@mui/material/Box';
import YearFilter from '../Filters/YearFilter.tsx';
import MonthsFilter from '../Filters/MonthsFilter.tsx';
import {toGridRows} from '../../pages/HostDetailStatisticPage/mappers/toGridRowByYear.ts';
import {dataGridStyles, rowSpacingStyle} from '../DailyPricing/styles.tsx';
import GlobalLayout from '../GlobalLayout.tsx';
import React from 'react';
import {Vehicle} from '../../interfaces/vehicle.ts';
import FullScreenLoader from '../Loader/FullScreenLoader';

export interface VehicleStatistic {
    vehicle: Vehicle;
    statistic: {
        earned: number;
        minPrice: number;
        maxPrice: number;
        avgPrice: number;
        availableCount: string;
    };
}

interface VehicleStatisticTableProps {
    data: VehicleStatistic[],
    onYearChange: (date: SelectChangeEvent<number>) => void,
    onMonthChange: (date: SelectChangeEvent<number>) => void,
    yearValue: number,
    monthValue: number,
}

const VehicleStatisticTable: React.FC<VehicleStatisticTableProps> = (props) => {
    const { data, onYearChange,  onMonthChange, yearValue, monthValue} = props;
    const listingAvailableColProps = {
        renderCell: (params: GridRenderCellParams) => (
            params.row.listingAvailable ? <CheckCircleIcon color="success" /> : <RemoveCircleIcon color="error" />
        ),
    }

    const carColProps = {
        renderCell: (params: GridRenderCellParams) => {
            if (params.row.url) {
                return (
                    <Link href={params.row.url} target="_blank" rel="noopener noreferrer">
                        {params.row.car}
                    </Link>
                )
            }

            return <span>{params.row.car}</span>
        },
        valueGetter: (param: string) => {
            return param
        },
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

    const availableCountColProps = {
        renderCell: (params: GridRenderCellParams) => {
            const availableCount = params.row['availableCount'];

            if (availableCount) {
                return availableCount;
            }

            return '-';
        },
        valueGetter: (param: string) => {
            return parseInt(param, 10);
        },
    }

    const columns: GridColDef[] = [
        { field: 'photo', headerName: 'Photo', ...photoColProps },
        { field: 'car', headerName: 'Model', ...carColProps },
        { field: 'carYear', headerName: 'Year' },
        { field: 'earned', headerName: 'Profit $' },
        { field: 'avgPrice', headerName: 'Average Price $' },
        { field: 'minPrice', headerName: 'Min Price $' },
        { field: 'maxPrice', headerName: 'Max Price $' },
        { field: 'availableCount', headerName: 'Available Count', ...availableCountColProps },
        { field: 'listingAvailable', headerName: 'Car Available', ...listingAvailableColProps },
    ];

    const layout = () => {
        if (!data) return <FullScreenLoader />

        return (
            <div style={{ marginTop: '-4em' }}>
                <div className="filters">
                    <YearFilter year={yearValue} onChange={onYearChange}/>
                    <MonthsFilter month={monthValue} onChange={onMonthChange}/>
                </div>

                <Box sx={{
                    height: 600,
                    width: '100%',
                    mt: 3,
                    mb: 3,
                }}>
                    <DataGrid
                        rows={toGridRows(data)}
                        columns={columns}
                        getRowId={(row) => row.id}
                        getRowSpacing={(params) => rowSpacingStyle(params)}
                        sx={dataGridStyles()}
                    />
                </Box>
            </div>
        )
    }

    return (
        <GlobalLayout>
            {layout()}
        </GlobalLayout>
    );
};

export default VehicleStatisticTable;
