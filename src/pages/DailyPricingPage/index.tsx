import React, { useEffect, useState } from 'react';
import GlobalLayout from '../../components/GlobalLayout.tsx';
import DailyPricingGrid from '../../components/DailyPricing';
import {Checkbox, FormControlLabel, SelectChangeEvent, Typography} from '@mui/material';
import VehicleGroupFilter from '../../components/Filters/VehicleGroupFilter.tsx';
import YearFilter from '../../components/Filters/YearFilter.tsx';
import MonthsFilter from '../../components/Filters/MonthsFilter.tsx';
import {ApiGetGroupListByCategoryId} from '../../api/endpoints/api-get-group-list-by-category-id.ts';
import {ApiGetDailyPricingByGroupId} from '../../api/endpoints/api-get-daily-pricing-by-groupId.ts';
import AverageGrid from '../../components/AverageGrid';
import BarChartAverage from '../../components/BarChartAverage';
import './dailyPricingPage.scss';
// import StateFilter from '../../components/Filters/StatesFilter.tsx';
import {ApiGetCategoryByNameAndUserId} from '../../api/endpoints/api-get-category-by-name-and-user-id.ts';
import { useLocation } from 'react-router-dom';
import { toCamelCase } from '../../helpers';

const DailyPricingPage: React.FC = () => {
    const location = useLocation();
    const userId = Number(localStorage.getItem('userId'));
    const path = location.pathname;
    const categoryUrl = path.split('/')[2];
    const CATEGORY_NAME = categoryUrl ? toCamelCase(categoryUrl) : 'dailyPricing';

    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [data, setData] = useState([]);
    const [selectedVehicleGroup, setSelectedVehicleGroup] = useState<number>(0);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
    // const [selectedState, setSelectedState] = useState<string>('FL');
    const [listingEnabled, setListingEnabled] = useState<boolean>(true);
    const [groupList, setGroupList] = useState<[{ name: string, id: number }]>([{name: 'default', id: 1}]);

    const updateFilters = async (categoryId: number) => {
        const rawGroupList = await ApiGetGroupListByCategoryId(categoryId);

        setGroupList(rawGroupList);
        setSelectedVehicleGroup(rawGroupList[0].id)
    };

    const fetchData = async () => {
        const rawData = await ApiGetDailyPricingByGroupId(
            selectedVehicleGroup,
            selectedYear,
            selectedMonth,
            listingEnabled,
        );

        setData(rawData);
    }

    useEffect(() => {
        const fetchCategoryId = async () => {
            try {
                const categoryData = await ApiGetCategoryByNameAndUserId(CATEGORY_NAME, userId);
                const id = categoryData?.id;
                if (id) {
                    setCategoryId(id);
                    updateFilters(id);
                }
            } catch (error) {
                console.error("Error fetching category ID:", error);
            }
        };
        fetchCategoryId();
    }, [userId, CATEGORY_NAME]);

    useEffect(() => {
        if (categoryId) {
            fetchData();
        }
    }, [selectedVehicleGroup, selectedYear, selectedMonth, listingEnabled]); // add selectedState

    const handleVehicleChange = (event: SelectChangeEvent<number>) => {
        setSelectedVehicleGroup(parseInt(event.target.value as string, 10));
    };
    const handleYearChange = (event: SelectChangeEvent<number>) => {
        setSelectedYear(parseInt(event.target.value as string, 10));
    };
    const handleMonthChange = (event: SelectChangeEvent<number>) => {
        setSelectedMonth(parseInt(event.target.value as string, 10));
    };

    // const handleStateChange = (event: SelectChangeEvent<string>) => {
    //     setSelectedState(event.target.value);
    // };
    const handleListingEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setListingEnabled(event.target.checked);
    };

    return (
        <GlobalLayout>
            <div className="filters">
                <VehicleGroupFilter activeGroupId={selectedVehicleGroup} groupList={groupList} onChange={handleVehicleChange} />
                <YearFilter year={selectedYear} onChange={handleYearChange} />
                <MonthsFilter month={selectedMonth} onChange={handleMonthChange} />
                {/*<StateFilter state={selectedState} onChange={handleStateChange} />*/}
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

            <DailyPricingGrid data={data} year={selectedYear} month={selectedMonth} />
            <Typography variant="h5">
                General indicators
            </Typography>
            <AverageGrid data={data} year={selectedYear} month={selectedMonth} />

            <BarChartAverage data={data} year={selectedYear} month={selectedMonth} />
        </GlobalLayout>
    );
};

export default DailyPricingPage;
