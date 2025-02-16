import {SelectChangeEvent} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import GlobalLayout from '../../components/GlobalLayout.tsx';
import {ApiGetDetailHostStatistic} from '../../api/endpoints/api-get-detail-host-statistic.ts';
import { Host } from '../../interfaces/host.ts';
import './dailyPricingPage.scss';
import HostStatisticCard from '../../components/Cards/HostStatisticCard';
import VehicleStatisticTable, {VehicleStatistic} from '../../components/VehiclesStatisticTable';
import FullScreenLoader from '../../components/Loader/FullScreenLoader';

export interface HostDetailStatistic {
    host: Partial<Host> & { vehiclesCount: number; totalEarned: number };
    vehicleList: VehicleStatistic[];
}

const HostDetailStatisticPage: React.FC = () => {
    const { hostId } = useParams();
    const [data, setData] = useState<HostDetailStatistic>();
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

    const fetchData = async () => {
        const data = await ApiGetDetailHostStatistic(
            Number(hostId),
            selectedYear,
            selectedMonth,
        );

        setData(data);
    }

    useEffect(() => {
        fetchData();
    }, [selectedYear, selectedMonth]);

    const handleYearChange = (event: SelectChangeEvent<number>) => {
        setSelectedYear(parseInt(event.target.value as string, 10));
    };

    const handleMonthChange = (event: SelectChangeEvent<number>) => {
        setSelectedMonth(parseInt(event.target.value as string, 10));
    };

    const layout = () => {
        if (!data) return <FullScreenLoader />


        return (
            <>
                <HostStatisticCard
                    // @ts-expect-error
                    image={data.vehicleList[0].vehicle.images}
                    firstName={data.host.firstName}
                    lastName={data.host.lastName}
                    // @ts-expect-error
                    memberSince={data.host.memberSince}
                    vehiclesCount={data.host.vehiclesCount}
                    year={selectedYear}
                    month={selectedMonth}
                    totalEarned={data.host.totalEarned}
                />

                <VehicleStatisticTable
                    data={data.vehicleList}
                    onMonthChange={handleMonthChange}
                    onYearChange={handleYearChange}
                    yearValue={selectedYear}
                    monthValue={selectedMonth}
                />
            </>
        )
    }

    return (
        <GlobalLayout>
            {layout()}
        </GlobalLayout>
    );
};

export default HostDetailStatisticPage;
