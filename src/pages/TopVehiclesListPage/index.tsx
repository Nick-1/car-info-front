import React, {useEffect, useState} from 'react';
import {ApiGetTopVehiclesByUnavailableDays} from '../../api/endpoints/get-top-vehicles-by-unavailable-days.ts';
import GlobalLayout from '../../components/GlobalLayout.tsx';
import {Backdrop, CircularProgress, SelectChangeEvent} from '@mui/material';
import VehiclesStatisticTable, {VehicleStatistic} from '../../components/VehiclesStatisticTable';
import {useParams} from 'react-router-dom';
import {getCountryCodeByName} from '../../helpers';
import {CountryName} from '../../enums/countries.ts';

export const TOP_LIMIT_VALUE = 20;

const TopVehiclesListPage: React.FC = () => {
  const { countryName } = useParams();
  const countryCode = getCountryCodeByName(countryName as CountryName);
  const [data, setData] = useState<VehicleStatistic[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

  const fetchData = async () => {
    const vehiclesStatistic = await ApiGetTopVehiclesByUnavailableDays(
        selectedYear,
        selectedMonth,
        countryCode,
        25,
        TOP_LIMIT_VALUE,
    );

    setData(vehiclesStatistic);
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
    if (!data) {
      return (
          <Backdrop
              sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
              open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
      )
    }

    return (
        <VehiclesStatisticTable
            data={data}
            onYearChange={handleYearChange}
            onMonthChange={handleMonthChange}
            yearValue={selectedYear}
            monthValue={selectedMonth}
        />
    );
  }

  return (
      <GlobalLayout>
        {layout()}
      </GlobalLayout>
  );
};

export default TopVehiclesListPage;
