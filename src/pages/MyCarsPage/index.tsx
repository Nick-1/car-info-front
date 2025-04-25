import React, {useEffect, useState} from 'react';
import GlobalLayout from '../../components/GlobalLayout.tsx';
import {Backdrop, Button, CircularProgress, SelectChangeEvent} from '@mui/material';
import VehiclesStatisticTable, {VehicleStatistic} from '../../components/VehiclesStatisticTable';
import {ApiGetStatisticForGroup} from '../../api/endpoints/get-statistic-for-group.ts';
import {Link, useParams} from 'react-router-dom';

export const TOP_LIMIT_VALUE = 20;

const MyCarsPage: React.FC = () => {
  const { countryName } = useParams();
  const [data, setData] = useState<VehicleStatistic[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

  const fetchData = async () => {
    const vehiclesStatistic = await ApiGetStatisticForGroup(
        'My cars',
        selectedYear,
        selectedMonth,
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
        <>
          <VehiclesStatisticTable
              data={data}
              onYearChange={handleYearChange}
              onMonthChange={handleMonthChange}
              yearValue={selectedYear}
              monthValue={selectedMonth}
          />

          <Button
              component={Link}
              variant="contained"
              to={`/${countryName}/daily-pricing-my-cars`}
              style={{ marginLeft: 20 }}
          >
            Daily Pricing
          </Button>
        </>
    );
  }

  return (
      <GlobalLayout>
        {layout()}
      </GlobalLayout>
  );
};

export default MyCarsPage;
