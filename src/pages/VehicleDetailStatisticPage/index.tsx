import {
    SelectChangeEvent,
} from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import GlobalLayout from '../../components/GlobalLayout.tsx';
import YearFilter from '../../components/Filters/YearFilter.tsx';
import {ApiGetDetailVehicleStatistic} from '../../api/endpoints/api-get-detail-vehicle-statistic.ts';
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {dataGridStyles, rowSpacingStyle} from '../../components/DailyPricing/styles.tsx';
import {mapData} from './mappers/toGridRowByYear.ts';
import './dailyPricingPage.scss';
import {Vehicle} from '../../interfaces/vehicle.ts';
import {DailyPricing} from '../../components/DailyPricing/types';
import VehicleStatisticCard from '../../components/Cards/VehicleStatisticCard';
import FullScreenLoader from '../../components/Loader/FullScreenLoader';

interface vehicleStatisticData {
    vehicle: Vehicle,
    dailyPricing: DailyPricing[],
}

const VehicleDetailStatisticPage: React.FC = () => {
    const { vehicleId } = useParams();
    const [data, setData] = useState<vehicleStatisticData>();
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    const fetchData = async () => {
        const data = await ApiGetDetailVehicleStatistic(
            Number(vehicleId),
            selectedYear,
        );

        setData(data);
    }

    useEffect(() => {
        fetchData();
    }, [selectedYear]);

    const handleYearChange = (event: SelectChangeEvent<number>) => {
        setSelectedYear(parseInt(event.target.value as string, 10));
    };

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
        { field: 'month', headerName: 'Month' },
        { field: 'earned', headerName: 'Profit' },
        { field: 'averagePrice', headerName: 'Average Price $' },
        { field: 'minPrice', headerName: 'Min Price $' },
        { field: 'maxPrice', headerName: 'Max Price $' },
        { field: 'availableCount', headerName: 'Available Count', ...availableCountColProps },
    ];

    const layout = () => {
        if (!data) return <FullScreenLoader />

        return (
            <>
                <VehicleStatisticCard
                    // @ts-expect-error
                    image={data.vehicle.images}
                    make={data.vehicle.make}
                    model={data.vehicle.model}
                    vehicleYear={data.vehicle.year}
                    listingEnabled={data.vehicle.listingEnabled}
                    listingCreatedTime={data.vehicle.listingCreatedTime}
                    dailyPricing={data.dailyPricing}
                    tripCount={data.vehicle.tripCount}
                    year={selectedYear}
                />

                <div className="filters">
                    <YearFilter year={selectedYear} onChange={handleYearChange} />
                </div>

                <Box sx={{
                    height: 600,
                    width: '100%',
                    mt: 3,
                    mb: 3,
                }}>
                    <DataGrid
                        rows={mapData(data.dailyPricing, selectedYear)}
                        columns={columns}
                        getRowId={(row) => row.id}
                        getRowSpacing={(params) => rowSpacingStyle(params)}
                        sx={dataGridStyles()}
                    />
                </Box>
            </>
        )
    }

    return (
        <GlobalLayout>
            { layout() }
        </GlobalLayout>
    );
};

export default VehicleDetailStatisticPage;
