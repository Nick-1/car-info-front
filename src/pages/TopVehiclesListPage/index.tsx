import React, {useEffect, useState} from 'react';
import {ApiGetTopVehiclesByUnavailableDays} from '../../api/endpoints/get-top-vehicles-by-unavailable-days.ts';
import GlobalLayout from '../../components/GlobalLayout.tsx';
import {Backdrop, CircularProgress, SelectChangeEvent} from '@mui/material';
import VehiclesStatisticTable, {VehicleStatistic} from '../../components/VehiclesStatisticTable';

const TopVehiclesListPage: React.FC = () => {
  const [data, setData] = useState<VehicleStatistic[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

  const fetchData = async () => {
    const vehiclesStatistic = await ApiGetTopVehiclesByUnavailableDays(
        selectedYear,
        selectedMonth,
        25,
        10,
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
