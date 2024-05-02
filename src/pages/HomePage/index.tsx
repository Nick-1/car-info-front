import VehicleGrid from "../../components/VehicleGrid";
import {useEffect, useState} from "react";
import axios from "axios";
import {toVehicleGrid} from "../../components/VehicleGrid/toGridMapper.ts";
const HomePage = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Effect is running');
    axios.get<any>('http://localhost:8005/api/v1/vehicle/statistic?hostId=4881621&from=2024-04-01&to=2024-05-01')
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

  console.info('data---', data);

  return (
    <>
       <VehicleGrid data={mappedData} />
    </>
  );
};

export default HomePage;
