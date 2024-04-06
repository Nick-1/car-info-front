import {data} from "./data.ts";
import VehicleGrid from "../../components/VehicleGrid.tsx";

const HomePage = () => {
  return (
    <>
      <VehicleGrid data={data} />
    </>
  );
};

export default HomePage;
