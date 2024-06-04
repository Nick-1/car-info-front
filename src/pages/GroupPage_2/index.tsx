import TableStatistic, {TableStatisticConfig} from "../../components/TableStatistic";
import { KYRYLO_HOST_ID } from "../HomePage/constants";
import {apiGetStatisticByPeriodAndHostId} from "../../api/endpoints/apiGetStatisticByPeriodAndHostId.ts";
import {apiGetStatisticByPeriodAndGroupId} from "../../api/endpoints/apiGetStatisticByPeriodAndGroupId.ts";

const GroupPage_2 = () => {
  const config_2: TableStatisticConfig = {
    id: KYRYLO_HOST_ID,
    apiGetDataMethod: apiGetStatisticByPeriodAndHostId,
    minDate: '2024-06-01'
  }

  const config_3: TableStatisticConfig = {
    id: 3,
    apiGetDataMethod: apiGetStatisticByPeriodAndGroupId,
    minDate: '2024-05-12'
  }

  return (
    <>
      <TableStatistic config={config_2}/>
      <TableStatistic config={config_3}/>
    </>
  )
};

export default GroupPage_2;
