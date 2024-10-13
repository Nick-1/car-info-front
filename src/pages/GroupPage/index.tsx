import {apiGetStatisticByPeriodAndGroupId} from "../../api/endpoints/apiGetStatisticByPeriodAndGroupId.ts";
import TableStatistic, {TableStatisticConfig} from "../../components/TableStatistic";
const GroupPage = () => {
  const config: TableStatisticConfig = {
    id: 13,
    apiGetDataMethod: apiGetStatisticByPeriodAndGroupId,
    minDate: '2024-10-14',
  }

  return (
    <TableStatistic config={config}/>
  )
};

export default GroupPage;
