import VehicleTable from "../../components/VehicleTable.tsx";
import DatePickerComponent from "../../components/DatePickerComponent";
import {useEffect, useState} from "react";
import axios from "axios";
import {info} from "sass";

const HomePage = () => {
  const [data, setData] = useState<any>([]);
  const [date, setDate] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<any>('http://localhost:8005/api/v1/vehicle/statistic?hostId=4881621&from=2024-03-31&to=2024-04-02');
        console.info('response', response);
        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, []);

  console.info('date----', date);

  return (
    <>
      <DatePickerComponent date={date} setDate={setDate} />
      <VehicleTable />
    </>
  );
};

export default HomePage;
