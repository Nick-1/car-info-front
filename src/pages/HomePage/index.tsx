import {KYRYLO_HOST_ID} from "./constants";
import {apiGetStatisticByPeriodAndHostId} from "../../api/endpoints/apiGetStatisticByPeriodAndHostId.ts";

import TableStatistic, {TableStatisticConfig} from "../../components/TableStatistic";
const HomePage = () => {
  const config: TableStatisticConfig = {
    id: KYRYLO_HOST_ID,
    apiGetDataMethod: apiGetStatisticByPeriodAndHostId,
  }

  return <TableStatistic config={config}/>
};

export default HomePage;
