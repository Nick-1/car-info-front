import VehicleGrid from "../../components/VehicleGrid";
import {useEffect, useState} from "react";
import {toVehicleGrid} from "../VehicleGrid/toGridMapper.ts";
import DateRangePicker from "../../components/DateRangePicker";
import GlobalLayout from "../../components/GlobalLayout.tsx";
import {DEFAULT_END_DATE, DEFAULT_START_DATE} from "../../pages/HomePage/constants";

export interface TableStatisticConfig {
  id: number,
  apiGetDataMethod: (id: number, from: string | null, to: string | null) => Promise<any>,
  from?: string,
  to?: string,
  minDate?: string
}

export interface TableStatisticProps {
  config: TableStatisticConfig
}

const TableStatistic = (props: TableStatisticProps) => {
  const { id, apiGetDataMethod, minDate } = props.config;
  const minCalendarDay = minDate ? minDate : DEFAULT_START_DATE;

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  // @ts-ignore
  const [endDate, setEndDate] = useState<string | null>(null);

  const getData = async (
    id: number, from: string | null, to: string | null
  ): Promise<void> => {
    try {
      const data = await apiGetDataMethod(id, from, to);

      setData(data);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError(error.message);
      setIsLoading(false);
    }
  }

  const handleStartDateChange = (date: string | null): void => {
    setStartDate(date);
  };

  const handleEndDateChange = async (date: string | null): Promise<void> => {
    setEndDate(date);

    await getData(id, startDate, date);
  };

  const setDefaultPeriod = async (): Promise<void> => {
    await getData(id, minCalendarDay, DEFAULT_END_DATE);
  }

  useEffect(() => {
    const fetchData = async () => {
      await setDefaultPeriod();
    };
    fetchData();
  }, []);

  const mappedData = toVehicleGrid(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <GlobalLayout>
      <DateRangePicker
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        minDate={minCalendarDay}
      />
      <VehicleGrid data={mappedData} />
    </GlobalLayout>
  );
};

export default TableStatistic;
