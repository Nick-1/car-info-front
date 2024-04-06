import {Vehicle} from "../../components/VehicleTable";
import {useState} from "react";
import {data} from "./data.ts";
import VehicleGrid from "../../components/VehicleGrid.tsx";

const HomePage = () => {
  const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);
  //setVehicleData(data);

  return (
    <>
      <VehicleGrid data={data} />
    </>
  );
};

export default HomePage;
