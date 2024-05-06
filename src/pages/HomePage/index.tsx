import VehicleGrid from "../../components/VehicleGrid";
import {useEffect, useState} from "react";
import {toVehicleGrid} from "../../components/VehicleGrid/toGridMapper.ts";
import { api } from "../../api/axios";
const HomePage = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Effect is running');
    api.get<any>('http://localhost:8005/api/v1/vehicle/statistic?hostId=4881621&from=2024-05-01&to=2024-05-31')
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const mappedData = toVehicleGrid(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
       <VehicleGrid data={mappedData} />
    </>
  );
};

export default HomePage;
