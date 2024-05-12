import VehicleGrid from "../../components/VehicleGrid";
import {useEffect, useState} from "react";
import {toVehicleGrid} from "../../components/VehicleGrid/toGridMapper.ts";
import DateRangePicker from "../../components/DateRangePicker";
import {DEFAULT_END_DATE, DEFAULT_START_DATE, KYRYLO_HOST_ID} from "./constants";
import {apiGetStatisticByPeriodAndHostId} from "../../api/endpoints/apiGetStatisticByPeriodAndHostId.ts";
import GlobalLayout from "../../components/GlobalLayout.tsx";
const HomePage = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const getData = async (
    hostId: number, from: string | null, to: string | null
  ): Promise<void> => {
    try {
      const data = await apiGetStatisticByPeriodAndHostId(hostId, from, to);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  const handleStartDateChange = (date: string | null): void => {
    setStartDate(date);
    console.log("Start Date Changed: ", date);
  };

  const handleEndDateChange = async (date: string | null): Promise<void> => {
    setEndDate(date);
    console.log("End Date Changed: ", date);
    await getData(KYRYLO_HOST_ID, startDate, date);
  };

  const setDefaultPeriod = async (): Promise<void> => {
    await getData(KYRYLO_HOST_ID, DEFAULT_START_DATE, DEFAULT_END_DATE);
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
      />
      <VehicleGrid data={mappedData} />
    </GlobalLayout>
  );
};

export default HomePage;
