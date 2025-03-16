import React, { useEffect, useState } from 'react';
import GlobalLayout from '../../components/GlobalLayout.tsx';
import DailyPricingGrid from '../../components/DailyPricing';
import {Checkbox, FormControlLabel, SelectChangeEvent} from '@mui/material';
import YearFilter from '../../components/Filters/YearFilter.tsx';
import MonthsFilter from '../../components/Filters/MonthsFilter.tsx';
import { useLocation } from 'react-router-dom';
import {ApiGetDailyPricingByHostId} from '../../api/endpoints/api-get-daily-pricing-by-host-id.ts';
import FullScreenLoader from '../../components/Loader/FullScreenLoader';
import './dailyPricingPage.scss';

const DailyPricingMyHostPage: React.FC = () => {
    const location = useLocation();
    const path = location.pathname.split('/');
    const hostId = Number(path[path.length - 1]);
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
    const [listingEnabled, setListingEnabled] = useState<boolean>(true);

    const fetchData = async () => {
        const rawData = await ApiGetDailyPricingByHostId(
            hostId,
            selectedYear,
            selectedMonth,
            listingEnabled,
        );

        setData(rawData);
    }

    useEffect(() => {
        fetchData();
    }, [selectedYear, selectedMonth, listingEnabled]);

    const handleYearChange = (event: SelectChangeEvent<number>) => {
        setSelectedYear(parseInt(event.target.value as string, 10));
    };
    const handleMonthChange = (event: SelectChangeEvent<number>) => {
        setData([]);
        setSelectedMonth(parseInt(event.target.value as string, 10));
    };
    const handleListingEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setListingEnabled(event.target.checked);
    };

    const layout = () => {
        if (data.length === 0) return <FullScreenLoader />

        return <DailyPricingGrid data={data} year={selectedYear} month={selectedMonth} />
    }

    return (
        <GlobalLayout>
            <div className="filters">
                <YearFilter year={selectedYear} onChange={handleYearChange} />
                <MonthsFilter month={selectedMonth} onChange={handleMonthChange} />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={listingEnabled}
                            onChange={handleListingEnabledChange}
                            color="primary"
                        />
                    }
                    label="Show only active"
                />
            </div>

            { layout() }

        </GlobalLayout>
    );
};

export default DailyPricingMyHostPage;
